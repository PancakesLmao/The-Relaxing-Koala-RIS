from typing import Annotated
from fastapi import APIRouter, Form, HTTPException
from ..db import Db
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

class AddStaffReq(BaseModel):
    first_name: str
    last_name: str
    role: str
@router.put("/add-staff", status_code=201, responses={404:{},409:{}})
async def add_staff(request: AddStaffReq):
    first_name = request.first_name
    last_name = request.last_name
    role = request.role

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

class RemoveStaffReq(BaseModel):
    staff_id: str
@router.delete("/remove-staff", status_code=204, responses={404: {}})
async def remove_staff(request: RemoveStaffReq):
    staff_id = request.staff_id

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

class EditStaffReq(BaseModel):
    staff_id: str
    changed_first_name: str
    changed_last_name: str
    changed_role: str
@router.patch("/edit-staff", status_code=204, responses={404:{}})
async def edit_staff(request: EditStaffReq):
    staff_id = request.staff_id
    changed_first_name = request.changed_first_name
    changed_last_name = request.changed_last_name
    changed_role = request.changed_role

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
