from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..db import Db
import datetime

router = APIRouter()
db = Db("db.sqlite")

class Reservation(BaseModel):
    reservation_id: int
    table_number: int
    customer_name: str
    customer_phone: str
    date_reserved: str
    notes: str
    date_added: str

@router.get("/get-all-reservations",status_code=200)
async def get_all_reservations() -> list[Reservation]:
    response: list[Reservation] = []
    query : str = '''
    select * from reservations;
    '''
    res = db.cursor.execute(query).fetchall()
    for reservation in res: 
        response.append(Reservation(
            reservation_id=reservation[0],
            table_number=reservation[1],
            customer_name=reservation[2],
            customer_phone=reservation[3],
            date_reserved=reservation[4],
            notes=reservation[5],
            date_added=reservation[6]
            ))
    return response

@router.get("/get-reservations-from-table/{table_number}",status_code=200)
async def get_reservation_from_table(table_number: int) -> list[Reservation]:
    response: list[Reservation] = []
    query: str = '''
    select * from reservations 
    where table_number=?;
    '''
    res = db.cursor.execute(query, [table_number]).fetchall()
    for reservation in res: 
        response.append(Reservation(
            reservation_id=reservation[0],
            table_number=reservation[1],
            customer_name=reservation[2],
            customer_phone=reservation[3],
            date_reserved=reservation[4],
            notes=reservation[5],
            date_added=reservation[6]
            ))
    return response

@router.get("/get-reservations-from-name/{customer_name}",status_code=200)
async def get_reservation_from_name(customer_name: str) -> list[Reservation]:
    response: list[Reservation] = []
    query: str = '''
    select * from reservations 
    where name=?;
    '''
    res = db.cursor.execute(query, [customer_name]).fetchall()
    for reservation in res: 
        response.append(Reservation(
            reservation_id=reservation[0],
            table_number=reservation[1],
            customer_name=reservation[2],
            customer_phone=reservation[3],
            date_reserved=reservation[4],
            notes=reservation[5],
            date_added=reservation[6]
            ))
    return response

class AddReservationReq(BaseModel):
    customer_name: str
    customer_phone: str
    notes: str
    table_number: int
    date_reserved: str
@router.put("/add-reservation",status_code=204)
async def add_reservation(request: AddReservationReq):
    query: str = '''
    select * from reservations
    where table_number=? and date_reserved = ?;
    '''
    res = db.cursor.execute(query, (request.table_number, request.date_reserved)).fetchone()
    if res != None:
        err: str = f"This table and time has already been reserved: table: {request.table_number} time: {request.date_reserved}"
        raise HTTPException(status_code=409, detail=err)

    query: str = '''
    select ifnull(max(invoice_id),0) from invoices;
    '''
    max_id = db.cursor.execute(query).fetchone()[0]

    query: str = '''
    insert into reservations
    values(?,?,?,?,?,?,?)
    '''
    db.cursor.execute(query, (
        max_id + 1,
        request.table_number,
        request.customer_name,
        request.customer_phone,
        request.date_reserved,
        request.notes,
        datetime.datetime.now().isoformat()
        ))

    query: str = '''
    update tables
    set table_status='RESERVED'
    where table_number=?
    '''
    db.cursor.execute(query, [request.table_number])
    db.connection.commit()
    return
