from fastapi import APIRouter, HTTPException
from ..db import Db
from pydantic import BaseModel
import datetime
from hashlib import sha256

class Staff(BaseModel):
    staff_id: int
    first_name: str
    last_name: str
    role:str
    password_hash: str | None
    date_added:str

router = APIRouter()
db = Db("db.sqlite")
staffs: list[Staff] = []

def init_menu_items():
    users = {
            'Le Phan' : [sha256('phantom'.encode('utf-8')).hexdigest(), "admin"],
            'Quoc An': [sha256('possay'.encode('utf-8')).hexdigest(), "admin"],
            'Bui Thao': [sha256('woah'.encode('utf-8')).hexdigest(), "admin"],
            'Nguyen Thinh': [sha256('cringe uwu'.encode('utf-8')).hexdigest(), "admin"],
            'Hatsune Miku': [sha256('popipo'.encode('utf-8')).hexdigest(), "chef"],
            'Nelo Angelo': [sha256('POWER'.encode('utf-8')).hexdigest(), "cashier"],
            'Minto Fantome': [sha256('doki_love:D'.encode('utf-8')).hexdigest(), "waiter"],
            }
    if staffs == []:
        for name,data in users.items():
            staff = Staff(
                    staff_id=list(users).index(name),
                    first_name=name.split(" ")[0],
                    last_name=name.split(" ")[1],
                    password_hash=data[0],
                    role=data[1],
                    date_added=datetime.datetime.now().isoformat()
                    )
            staffs.append(staff)
            
    query: str = '''
    delete from staff;
    '''
    db.cursor.execute(query)
    db.connection.commit()

    for staff in staffs:
        query = '''
        insert into staff
        values
        (?,?,?,?,?,?);
        '''
        db.cursor.execute(query, (
            staff.staff_id,
            staff.first_name,
            staff.last_name,
            staff.role,
            staff.password_hash,
            staff.date_added,
                                  )
                          )
    db.connection.commit()

    return
init_menu_items()

def staff_check_exists(staff_id:str) -> bool:
    query: str = '''
    SELECT staff_id FROM staff
    WHERE staff_id=?;
    '''
    res = db.cursor.execute(query, staff_id)
    if res.fetchone() == None:
        return False
    return True

class LoginReq(BaseModel):
    first_name: str
    last_name: str
    password: str
class LoginRes(BaseModel):
    first_name: str
    last_name: str
    role: str
@router.post("/login", status_code=200)
async def staff_login(request: LoginReq) -> LoginRes:
    response: LoginRes
    query: str = '''
    select * from staff
    where first_name=? and last_name=?;
    '''
    res = db.cursor.execute(query, (request.first_name, request.last_name)).fetchone()
    if res == None: 
        err: str = f"This staff does not exists: {request.first_name} {request.last_name}"
        raise HTTPException(status_code=404, detail=err)

    password_hash_inDB = res[4]
    if sha256(request.password.encode('utf-8')).hexdigest() != password_hash_inDB:
        err: str = f"Wrong Password!!!"
        raise HTTPException(status_code=409, detail=err)
    response = LoginRes(
            first_name=res[1],
            last_name=res[2],
            role=res[3],
            )
    
    return response

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
            password_hash=None,
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
    db.cursor.execute(query, (max_id + 1,first_name,last_name,role,datetime.datetime.now().isoformat()))
    db.connection.commit()
    return

class RemoveStaffReq(BaseModel):
    staff_id: int
@router.delete("/remove-staff", status_code=204, responses={404: {}})
async def remove_staff(request: RemoveStaffReq):
    staff_id = request.staff_id

    if not staff_check_exists(str(staff_id)):
        err: str = f"cannot find this employee: {staff_id}"
        raise HTTPException(status_code=404, detail=err)

    query: str = '''
    DELETE FROM staff 
    WHERE staff_id=?;
    '''
    db.cursor.execute(query, [staff_id])
    db.connection.commit()
    return

class EditStaffReq(BaseModel):
    staff_id: int
    changed_first_name: str
    changed_last_name: str
    changed_role: str
@router.patch("/edit-staff", status_code=204, responses={404:{}})
async def edit_staff(request: EditStaffReq):
    staff_id = request.staff_id
    changed_first_name = request.changed_first_name
    changed_last_name = request.changed_last_name
    changed_role = request.changed_role

    if not staff_check_exists(str(staff_id)):
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
