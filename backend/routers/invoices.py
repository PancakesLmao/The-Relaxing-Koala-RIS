from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..db import Db
from .. import checks
import datetime

TAX = 0.1

router = APIRouter()
db = Db("db.sqlite")

class OrderItem(BaseModel):
    order_item_id: int
    order_id: int
    menu_item_id: int
    status: str
    quantity: int
    note: str
    date_added: str

class InvoiceResponse(BaseModel):
    invoice_id: int
    order_id: int
    customer_name: str = ''
    total: float = 0.0
    total_after_tax: float = 0.0
    order_items: list[OrderItem] = []
    date_added: str


class AddInoviceReq(BaseModel):
    order_id: int
@router.put("/add-invoice", status_code=204, responses={404: {},409: {}})
async def add_invoice(request: AddInoviceReq):
    order_id = request.order_id
    checks.check_if_order_exists(str(order_id))
    checks.check_if_invoice_exists(str(order_id))
    
    query: str = '''
    select ifnull(max(invoice_id),0) from invoices;
    '''
    max_id = db.cursor.execute(query).fetchone()[0]

    query: str ='''
    insert into invoices(invoice_id, order_id, date_added)
    values(?,?,?);
    '''
    db.cursor.execute(query, (max_id + 1, order_id, datetime.datetime.now().isoformat()))
    db.connection.commit()
    
    return


@router.get("/get-single-invoice/{order_id}", status_code=200, responses={404: {}})
async def get_single_invoice(order_id) -> InvoiceResponse:
    response: InvoiceResponse
    
    checks.check_if_order_exists(str(order_id))

    query: str = '''
    select * from invoices
    where order_id=?;
    '''
    res = db.cursor.execute(query, [order_id]).fetchone()
    if res == None:
        err: str = f"There is no invoice associated with this order: {order_id}"
        raise HTTPException(status_code=404, detail = err)

    response = InvoiceResponse(
            invoice_id=res[0],
            order_id=res[1],
            date_added=res[2]
            )
    query: str = '''
    select * from orders
    where order_id = ?;
    '''
    res = db.cursor.execute(query, [response.order_id]).fetchone()
    response.customer_name = res[1]

    query: str = '''
    select * from order_items
    where order_id=?;
    '''
    menu_item_ids_to_quantity = {}
    res = db.cursor.execute(query, [response.order_id]).fetchall()
    for order_item in res:
        response.order_items.append(OrderItem(
            order_item_id=order_item[0],
            order_id=order_item[1],
            menu_item_id=order_item[2],
            status=order_item[3],
            quantity=order_item[4],
            note=order_item[5],
            date_added=order_item[6],
            ))
        menu_item_ids_to_quantity[order_item[0]] = [order_item[2],order_item[4]]
    
    for _, item in menu_item_ids_to_quantity.items():
        id = item[0]
        quantity = item[1]
        query: str = '''
        select * from menu_items
        where menu_item_id=?;
        '''
        res = db.cursor.execute(query, [id]).fetchone()
        response.total += res[2] * quantity
    response.total_after_tax = response.total * (1 + TAX)

    return response
