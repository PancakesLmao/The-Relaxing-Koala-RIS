from typing import Annotated
from fastapi import APIRouter, Form, HTTPException
from db import Db
from pydantic import BaseModel
import datetime

class Staff(BaseModel):
    staff_id: int
    first_name: str
    last_name: str
    role:str
    date_added:str

router = APIRouter()
db = Db("db.sqlite")

@router.get("/get-staffs", status_code=200)
async def all_staff() -> list[Staff]:
    response: list[Staff] = []
    query: str = '''
    SELECT rowid,* FROM staff;
    '''
    res = db.cursor.execute(query)
    for staff in res.fetchall():
        response.append(Staff(
            staff_id = staff[0],
            first_name = staff[1],
            last_name = staff[2],
            role = staff[3],
            date_added = staff[4]
            ))
    return response

@router.post("/add-staff", status_code=204)
async def add_staff(first_name: Annotated[str, Form()],
                    last_name: Annotated[str, Form()],
                    role: Annotated[str, Form()]):
    query: str = '''
    SELECT rowid FROM staff
    WHERE first_name=? AND last_name=?;
    '''
    res = db.cursor.execute(query, (first_name, last_name))
    if res.fetchone() != None:
        err: str = f"This employee already exists: {first_name} {last_name}"
        raise HTTPException(status_code=409, detail=err)
    query: str = '''
    INSERT INTO staff(first_name, last_name, role, date_added)
    VALUES(?,?,?,?);
    '''
    db.cursor.execute(query, (first_name,last_name,role,datetime.datetime.now()))
    db.connection.commit()
    return

@router.delete("/remove-staff/", status_code=204)
async def remove_staff(
        first_name: Annotated[str, Form()],
        last_name: Annotated[str, Form()]
        ):

    query: str = '''
    SELECT rowid FROM staff
    WHERE first_name=? AND last_name=?;
    '''
    res = db.cursor.execute(query, (first_name, last_name))
    if res.fetchone() == None:
        err: str = f"cannot find this employee: {first_name} {last_name}"
        raise HTTPException(status_code=404, detail=err)

    query: str = '''
    DELETE FROM staff 
    WHERE first_name=? AND last_name=?;
    '''
    db.cursor.execute(query, (first_name, last_name))
    db.connection.commit()
    return
