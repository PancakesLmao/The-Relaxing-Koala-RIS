from fastapi import APIRouter, Form, HTTPException
from pydantic import BaseModel
from typing import Annotated
from db import Db
import datetime

router = APIRouter()
db = Db("db.sqlite")

class Table(BaseModel):
    table_number: int
    table_capacity: int
    table_status: str
    order_id: str | None 
    date_added: str

@router.get("/get-tables" ,status_code=200)
async def get_tables() -> list[Table]:
    tables: list[Table] = []
    query: str = '''
    SELECT * FROM tables;
    '''
    res = db.cursor.execute(query)
    for table in res.fetchall():
        tables.append(Table(
                table_number = table[0],
                table_capacity= table[1],
                table_status = table[2],
                order_id = table[3],
                date_added = table[4],
                ))
    return tables

@router.post("/add-table", status_code=201)
async def add_table(
        table_number: Annotated[str, Form()],
        table_capacity: Annotated[str, Form()]
        ):
    query: str = '''
    SELECT table_number FROM tables 
    WHERE table_number=?;
    '''

    res = db.cursor.execute(query, table_number)
    if res.fetchone() != None:
        err: str = f"Table number:{table_number} already exists"
        raise HTTPException(status_code=409, detail=err)

    query: str = '''
    SELECT IFNULL(MAX(table_id),0) FROM tables;
    '''
    max_id = db.cursor.execute(query).fetchone()

    query: str = '''
    INSERT INTO tables(table_id,table_number, table_capacity, date_added)
    VALUES(?,?,?,?)
    '''
    db.cursor.execute(query, (max_id + 1,table_number, table_capacity, datetime.datetime.now()))
    db.connection.commit()
    return

@router.patch("/add-order-to-table", status_code=204)
async def update_table(
        table_number: Annotated[str, Form()],
        order_id: Annotated[str, Form()],
        ):
    query: str = '''
    select order_id from orders 
    where order_id = ?;
    '''
    res = db.cursor.execute(query, order_id)
    if res.fetchone() == None:
        err: str = f"Cannot find the order: {order_id}"
        raise HTTPException(status_code=404, detail=err)

    query: str = '''
    select table_number from tables 
    where table_number = ?;
    '''
    res = db.cursor.execute(query, order_id)
    if res.fetchone() == None:
        err: str = f"Cannot find the table: {table_number}"
        raise HTTPException(status_code=404, detail=err)

    query: str = '''
    UPDATE tables
    SET order_id = ?
    WHERE table_number = ?;
    '''
    db.cursor.execute(query, (order_id, table_number))

    query: str = '''
    UPDATE orders
    SET table_number = ?
    WHERE order_id = ?;
    '''
    db.cursor.execute(query, (table_number, order_id))
    db.connection.commit()
    return
