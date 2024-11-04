from fastapi import APIRouter, Request, HTTPException
from db import Db
from pydantic import BaseModel
import datetime

router = APIRouter()

db = Db("db.sqlite")

class MenuItem(BaseModel):
    menu_item_id: int
    item_name: str
    price: float
    image_name: str
    date_added: str

def test_init_menu_items():
    query: str = '''
    delete from menu_items;
    '''
    db.cursor.execute(query)
    for i in range(10):
        menu_item = MenuItem(menu_item_id=i,
                             item_name="lol",
                             price=10.69,
                             image_name="no",
                             date_added=str(datetime.datetime.now())
                             )
        query: str = '''
        insert into menu_items(menu_item_id,item_name,price,image_name,date_added)
        values(?,?,?,?,?);
        '''
        db.cursor.execute(query,
                          (
                              menu_item.menu_item_id,
                              menu_item.item_name,
                              menu_item.price,
                              menu_item.image_name,
                              menu_item.date_added
                              )
                          )
    db.connection.commit()
test_init_menu_items()
def check_if_order_exists(order_id: str):
    query: str = '''
    select * from orders
    where order_id = ?;
    '''
    res = db.cursor.execute(query, order_id)
    if res.fetchone() == None:
        err: str = f'This order does not exists: {order_id}'
        raise HTTPException(status_code=404, detail=err)
    return True

@router.get("/get-order", status_code=200)
async def get_order(request: Request):
    body = await request.json()
    order_id = body["order_id"]

    check_if_order_exists(order_id)

    query: str = '''
    select * from orders
    where order_id=?;
    '''
    response = db.cursor.execute(query, order_id)
    response = response.fetchone()
    return response

@router.get("/get-order-items-from-id", status_code=200)
async def get_order_items(request: Request):
    body = await request.json()
    order_id = body["order_id"]

    check_if_order_exists(order_id)

    query: str = '''
    select * from order_items
    where order_id = ?;
    ''' 
    result = db.cursor.execute(query, order_id).fetchall()
    print(result)

    return

@router.put("/add-order-item", status_code=204)
async def add_order_item(request: Request):
    body = await request.json()
    order_id = body["order_id"]
    note = body["note"]
    menu_item_id = body["menu_item_id"]
    quantity = body["quantity"]
    status = body["status"]

    check_if_order_exists(order_id)
    query: str = '''
    select ifnull(max(order_item_id),0) from order_items;
    '''
    max_id = db.cursor.execute(query).fetchone()[0]
    query: str = '''
    insert into order_items(order_item_id,order_id,note,menu_item_id,quantity,status)
    values(?,?,?,?,?)
    '''
    db.cursor.execute(query,(max_id + 1, order_id,note,menu_item_id,quantity,status))
    return
