from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..db import Db
import datetime
db = Db("db.sqlite")

router = APIRouter()

class Receipt(BaseModel):
    receipt_id: int
    order_id: int
    invoice_id: int
    total: float
    total_after_tax: float
    payment_method: str
    amount_given: float
    change: float
    date_added: str

class AddReceiptReq(BaseModel):
    invoice_id: int
    order_id: int
    total: float
    total_after_tax: float
    payment_method: str
    amount_given: float
@router.put("/add-receipt", status_code=204, responses={404:{},409:{}})
async def add_receipt(request: AddReceiptReq):
    query: str = '''
    select * from invoices
    where invoice_id =?;
    '''
    res = db.cursor.execute(query, [request.invoice_id]).fetchone()
    if res == None:
        err: str = f"This invoice does not exists: {request.invoice_id}"
        raise HTTPException(status_code=404, detail=err)

    query: str ='''
    select * from receipts
    where invoice_id=?;
    '''
    res = db.cursor.execute(query, [request.invoice_id]).fetchone()
    if res != None:
        err: str = f"This receipt already exists"
        raise HTTPException(status_code=409, detail=err)

    change = request.total_after_tax - request.amount_given
    query: str = '''
    select ifnull(max(invoice_id),0) from invoices;
    '''
    max_id = db.cursor.execute(query).fetchone()[0]
    query: str = '''
    insert into receipts
    values(?,?,?,?,?,?,?,?,?);
    '''
    db.cursor.execute(query, (
        max_id + 1,
        request.order_id,
        request.invoice_id,
        request.total,
        request.total_after_tax,
        request.payment_method,
        request.amount_given,
        change,
        datetime.datetime.now().isoformat()
        ))
    db.connection.commit()
    return

@router.get("/get-all-receipts", status_code=200)
async def get_all_receipts() -> list[Receipt]:
    response = []
    query: str = '''
    select * from receipts
    '''
    res = db.cursor.execute(query)
    for receipt in res:
        response.append(Receipt(
            receipt_id=receipt[0],
            order_id=receipt[1],
            invoice_id=receipt[2],
            total=receipt[3],
            total_after_tax=receipt[4],
            payment_method=receipt[5],
            amount_given=receipt[6],
            change=receipt[7],
            date_added=receipt[8],
            ))
    return response
