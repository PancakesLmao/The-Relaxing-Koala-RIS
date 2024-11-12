from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..db import Db
import datetime
import random

router = APIRouter()
db = Db("db.sqlite")

class Reservation(BaseModel):
    reservation_id: int
    number_of_people: int
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
            number_of_people=reservation[1],
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
            number_of_people=reservation[1],
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
            number_of_people=reservation[1],
            customer_name=reservation[2],
            customer_phone=reservation[3],
            date_reserved=reservation[4],
            notes=reservation[5],
            date_added=reservation[6]
            ))
    return response

@router.get("/get-reservations-from-phone/{customer_phone}",status_code=200)
async def get_reservation_from_phone(customer_phone: str) -> list[Reservation]:
    response: list[Reservation] = []
    query: str = '''
    select * from reservations 
    where phone=?;
    '''
    res = db.cursor.execute(query, [customer_phone]).fetchall()
    for reservation in res: 
        response.append(Reservation(
            reservation_id=reservation[0],
            number_of_people=reservation[1],
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
    number_of_people: int
    date_reserved: str
@router.put("/add-reservation",status_code=204)
async def add_reservation(request: AddReservationReq):
    if request.number_of_people > 12:
        err: str = f"You cannot book for more than 12 person at a time"
        raise HTTPException(status_code=409,detail=err)
    query: str = '''
    select * from reservations
    where number_of_people=? and date_reserved = ?;
    '''
    res = db.cursor.execute(query, (request.number_of_people, request.date_reserved)).fetchone()
    if res != None:
        err: str = f"This table and time has already been reserved: table: {request.number_of_people} time: {request.date_reserved}"
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
        request.number_of_people,
        request.customer_name,
        request.customer_phone,
        request.date_reserved,
        request.notes,
        datetime.datetime.now().isoformat()
        ))
    tables = []
    table_number = []
    if request.number_of_people == 4:
        query: str = '''
        select table_number tables
        where table_status='UNOCCUPIED';
        '''
        res = db.cursor.execute(query).fetchall()
        if res == None: 
            err: str = f"No tables are available for your reservation"
            raise HTTPException(status_code=409, detail=err)
        for table in res:
            tables.append(table)
        table_number.append(random.choice(tables))

    if request.number_of_people <= 6: 
        query: str = '''
        select table_number from tables
        where table_capacity=6 and table_status='UNOCCUPIED';
        '''
        res = db.cursor.execute(query).fetchall()
        if res == None: 
            err: str = f"No tables are available for your reservation"
            raise HTTPException(status_code=409, detail=err)
        for table in res:
            tables.append(table)
        table_number = random.choice(tables)
    else:
        query: str = '''
        select table_number from tables
        where table_capacity=6 and table_status='UNOCCUPIED';
        '''
        res = db.cursor.execute(query).fetchall()
        if res == None: 
            err: str = f"No tables are available for your reservation"
            raise HTTPException(status_code=409, detail=err)
        for table in res:
            tables.append(table)
        table_number = random.sample(tables, 2)
        
    query: str = '''
    update tables
    set table_status='RESERVED'
    where table_number=? or table_number=?;
    '''
    if len(table_number) ==1:
        db.cursor.execute(query, [table_number[0]])
    else:
        db.cursor.execute(query, (str(table_number[0][0]), str(table_number[1][0])))

    db.connection.commit()
    return
