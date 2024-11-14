from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..db import Db
import datetime
import random

router = APIRouter()
db = Db("db.sqlite")

class Reservation(BaseModel):
    reservation_id: int
    table_number: int
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
            table_number=reservation[1],
            number_of_people=reservation[2],
            customer_name=reservation[3],
            customer_phone=reservation[4],
            date_reserved=reservation[5],
            notes=reservation[6],
            date_added=reservation[7]
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
            number_of_people=reservation[2],
            customer_name=reservation[3],
            customer_phone=reservation[4],
            date_reserved=reservation[5],
            notes=reservation[6],
            date_added=reservation[7]
            ))
    return response

@router.get("/get-reservations-from-name/{customer_name}",status_code=200)
async def get_reservation_from_name(customer_name: str) -> list[Reservation]:
    customer_name = f"%{customer_name}%"
    response: list[Reservation] = []
    query: str = '''
    select * from reservations 
    where name like ?;
    '''
    res = db.cursor.execute(query, [customer_name]).fetchall()
    for reservation in res: 
        response.append(Reservation(
            reservation_id=reservation[0],
            table_number=reservation[1],
            number_of_people=reservation[2],
            customer_name=reservation[3],
            customer_phone=reservation[4],
            date_reserved=reservation[5],
            notes=reservation[6],
            date_added=reservation[7]
            ))
    return response

@router.get("/get-reservations-from-table/{table_number}",status_code=200)
async def get_reservation_from_table(table_number: str) -> list[Reservation]:
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
            number_of_people=reservation[2],
            customer_name=reservation[3],
            customer_phone=reservation[4],
            date_reserved=reservation[5],
            notes=reservation[6],
            date_added=reservation[7]
            ))
    return response

@router.get("/get-reservations-from-phone/{customer_phone}",status_code=200)
async def get_reservation_from_phone(customer_phone: str) -> list[Reservation]:
    customer_phone = f"%{customer_phone}%"
    response: list[Reservation] = []
    query: str = '''
    select * from reservations 
    where phone like ?;
    '''
    res = db.cursor.execute(query, [customer_phone]).fetchall()
    for reservation in res: 
        response.append(Reservation(
            reservation_id=reservation[0],
            table_number=reservation[1],
            number_of_people=reservation[2],
            customer_name=reservation[3],
            customer_phone=reservation[4],
            date_reserved=reservation[5],
            notes=reservation[6],
            date_added=reservation[7]
            ))
    return response

@router.delete("/remove-reservation/{reservation_id}", status_code=200)
async def remove_reservation(reservation_id: int):
    query: str ='''
    select * from reservations
    where reservation_id=?;
    '''
    res = db.cursor.execute(query, [reservation_id]).fetchone()
    if res == None:
        err: str = f"There are no reservations with this id: {reservation_id}"
        raise HTTPException(status_code=404, detail=err)
    query: str = '''
    delete from reservations
    where reservation_id=?;
    '''
    db.cursor.execute(query, [reservation_id])
    db.connection.commit()
    return

class AddReservationReq(BaseModel):
    customer_name: str
    customer_phone: str
    notes: str
    number_of_people: int
    date_reserved: str
@router.put("/add-reservation",status_code=204)
async def add_reservation(request: AddReservationReq):
    if request.number_of_people > 6:
        err: str = f"You cannot book for more than 6 person at a time"
        raise HTTPException(status_code=409,detail=err)
    tables = []
    if request.number_of_people <= 4:
        query: str = '''
        select table_number from tables
        where table_status='UNOCCUPIED';
        '''
        res = db.cursor.execute(query).fetchall()
        if res == []: 
            err: str = f"No tables are available for your reservation"
            raise HTTPException(status_code=404, detail=err)
        for table in res:
            tables.append(table)
        table_number = random.choice(tables)

    if request.number_of_people <= 6: 
        query: str = '''
        select table_number from tables
        where table_capacity=6 and table_status='UNOCCUPIED';
        '''
        res = db.cursor.execute(query).fetchall()
        if res == []: 
            err: str = f"No tables are available for your reservation"
            raise HTTPException(status_code=404, detail=err)
        for table in res:
            tables.append(table[0])

        table_number = random.choice(tables)

    query: str = '''
    update tables
    set table_status='RESERVED'
    where table_number=?;
    '''
    print(type(table_number))
    db.cursor.execute(query, [table_number])
    
    query: str = '''
    select ifnull(max(reservation_id),0) from reservations;
    '''
    max_id = db.cursor.execute(query).fetchone()[0]

    query: str = '''
    insert into reservations
    values(?,?,?,?,?,?,?,?)
    '''
    db.cursor.execute(query, (
        max_id + 1,
        table_number,
        request.number_of_people,
        request.customer_name,
        request.customer_phone,
        request.date_reserved,
        request.notes,
        datetime.datetime.now().isoformat()
        ))

    db.connection.commit()
    return
