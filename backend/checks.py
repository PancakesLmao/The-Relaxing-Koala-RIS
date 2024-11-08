from fastapi import HTTPException
from .db import Db
db = Db("db.sqlite")

def check_if_order_exists(order_id: str):
    query: str = '''
    select * from orders
    where order_id = ?;
    '''
    res = db.cursor.execute(query, [order_id])
    if res.fetchone() == None:
        err: str = f'This order does not exists: {order_id}'
        raise HTTPException(status_code=404, detail=err)
    return True

def check_if_menu_item_exists(menu_item_id: str):
    query: str = '''
    select * from menu_items
    where menu_item_id = ?;
    '''
    res = db.cursor.execute(query,[menu_item_id])
    if res.fetchone() == None:
        err: str = f"This menu item does not exists: {menu_item_id}"
        raise HTTPException(status_code=404, detail=err)
    return True

def check_invoice_exists(order_id: str):
    query: str = '''
    select * from invoices
    where order_id = ?;
    '''
    res = db.cursor.execute(query, [order_id])
    if res.fetchone() != None:
        err: str = f'This order already has an invoice: {order_id}'
        raise HTTPException(status_code=409, detail=err)
    return True
