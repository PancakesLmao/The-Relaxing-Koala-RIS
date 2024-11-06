from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from ..db import Db
import datetime
import random

router = APIRouter()
db = Db("db.sqlite")


class Table(BaseModel):
    table_number: int
    order_id: str | None 
    table_capacity: int
    table_status: str
    date_added: str

tables: list[Table] = []


def check_table_exists(table_number: str) -> bool:
    query: str = '''
    select * from tables 
    where table_number= ?;
    '''
    result = db.cursor.execute(query, [table_number])
    if result.fetchone() == None:
        return False
    return True

@router.get("/get-tables" ,status_code=200)
async def get_tables() -> list[Table]:
    tables: list[Table] = []
    query: str = '''
    SELECT * FROM tables;
    '''
    res = db.cursor.execute(query)
    for table in res.fetchall():
        tables.append(Table(
                table_number= table[0],
                order_id = table[1],
                table_capacity= table[2],
                table_status = table[3],
                date_added = table[4],
                ))
    return tables

@router.get("/get-single-table/{table_number}", status_code=200)
async def get_single_table(table_number):
    if not check_table_exists(table_number):
        err: str = f'This table does not exists: {table_number}'
        raise HTTPException(status_code=404, detail=err)

    query: str ='''
    select * from tables
    where table_number = ?;
    '''
    response = db.cursor.execute(query, table_number).fetchone()
    response = Table(
            table_number=response[0],
            order_id=response[1],
            table_capacity=response[2],
            table_status=response[3],
            date_added=response[4],
            )

    return response

def init_tables():
    if tables == []:
        for i in range(12):
            table = Table(table_number=i,
                          table_capacity=random.choice([2,4,6]),
                          table_status="UNOCCUPIED",
                          order_id=None,
                          date_added=str(datetime.datetime.now())
                          )
            tables.append(table)
    query: str = '''
    delete from tables;
    '''
    db.cursor.execute(query)
    for table in tables:
        query = '''
        insert into tables
        (table_number,table_number,table_capacity,table_status,order_id,date_added)
        values
        (?,?,?,?,?,?);
        '''
        db.cursor.execute(query, (table.table_number,
                                  table.table_number,
                                  table.table_capacity,
                                  table.table_status,
                                  table.order_id,
                                  table.date_added,
                                  )
                          )
    db.connection.commit()

    return
init_tables()

@router.patch("/add-order", status_code=204)
async def update_table(request: Request):
    body = await request.json()
    table_number = body["table_number"]
    customer_name = body["customer_name"]

    if not check_table_exists(table_number):
        err: str = f'This table does not exists: {table_number}'
        raise HTTPException(status_code=404, detail=err)

    query: str = '''
    select table_status from tables
    where table_number=?;
    '''
    res = db.cursor.execute(query,table_number)
    if res.fetchone()[0] == "OCCUPIED":
        err: str = f'This table is already occupied, {table_number}'
        raise HTTPException(status_code=409, detail=err)

    query: str = '''
    select ifnull(max(order_id),0) from orders;
    '''
    res = db.cursor.execute(query)
    max_id = res.fetchone()[0]

    query: str = '''
    insert into orders(order_id,name,date_added)
    values(?,?,?);
    '''
    db.cursor.execute(query, (max_id + 1,customer_name,datetime.datetime.now()))

    query: str = '''
    UPDATE tables
    SET order_id = ?, table_status = ?
    WHERE table_number = ?;
    '''
    db.cursor.execute(query, (max_id + 1, "OCCUPIED", table_number))
    db.connection.commit()
    return
