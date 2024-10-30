from fastapi import APIRouter, Form
from pydantic import BaseModel
from typing import Annotated
from db import Db

router = APIRouter()
db = Db("db.sqlite")

@router.get("/get-tables" ,status_code=200)
async def get_tables():
    query: str = '''
    select * from tables;
    '''
    res = db.cursor.execute(query)
    print(res)
    return

@router.put("/add-table", status_code=201)
async def add_table(
        table_number: Annotated[str, Form()],
        table_capacity: Annotated[str, Form()]
        ):
    query: str = '''
    SELECT table_number FROM tables 
    WHERE table_number=?;
    '''

    res = db.cursor.execute(query, table_number)
    if res.fetchone() == None:
        return

    return
