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

def staff_check_exists(staff_id:str) -> bool:
    query: str = '''
    SELECT staff_id FROM staff
    WHERE staff_id=?;
    '''
    res = db.cursor.execute(query, staff_id)
    if res.fetchone() == None:
        return False
    return True

@router.get("/get-staffs", status_code=200)
async def all_staff() -> list[Staff]:
    response: list[Staff] = []
    query: str = '''
    SELECT * FROM staff;
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

@router.post("/add-staff", status_code=201)
async def add_staff(first_name: Annotated[str, Form()],
                    last_name: Annotated[str, Form()],
                    role: Annotated[str, Form()]):
    query: str = '''
    SELECT staff_id FROM staff
    WHERE first_name=? AND last_name=?;
    '''
    res = db.cursor.execute(query, (first_name, last_name))
    if res.fetchone() != None:
        err: str = f"This employee already exists: {first_name} {last_name}"
        raise HTTPException(status_code=409, detail=err)

    query: str = '''
    SELECT IFNULL(MAX(staff_id),0) FROM staff;
    '''
    max_id = db.cursor.execute(query).fetchone()
    query: str = '''
    insert into staff(staff_id,first_name, last_name, role, date_added)
    values(?,?,?,?,?);
    '''
    db.cursor.execute(query, (max_id + 1,first_name,last_name,role,datetime.datetime.now()))
    db.connection.commit()
    return

@router.delete("/remove-staff", status_code=204)
async def remove_staff(
        staff_id: Annotated[str, Form()],
        ):

    if not staff_check_exists(staff_id):
        err: str = f"cannot find this employee: {staff_id}"
        raise HTTPException(status_code=404, detail=err)

    query: str = '''
    DELETE FROM staff 
    WHERE staff_id=?;
    '''
    db.cursor.execute(query, staff_id)
    db.connection.commit()
    return
@router.patch("/edit-staff", status_code=204)
async def edit_staff(
        staff_id: Annotated[str, Form()],
        changed_first_name: Annotated[str, Form()],
        changed_last_name: Annotated[str, Form()],
        changed_role: Annotated[str, Form()],
        ):

    if not staff_check_exists(staff_id):
        err: str = f"cannot find this employee: {staff_id}"
        raise HTTPException(status_code=404, detail=err)

    query: str =''' 
    UPDATE staff 
    SET first_name=?, last_name=?, role =?
    WHERE staff_id=?;
    '''
    db.cursor.execute(query, (changed_first_name, changed_last_name, changed_role))
    db.connection.commit()
    return
