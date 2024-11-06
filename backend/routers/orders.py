from fastapi import APIRouter, Request, HTTPException
from ..db import Db
from pydantic import BaseModel
import datetime

router = APIRouter()

db = Db("db.sqlite")

class OrderItems(BaseModel):
    order_item_id: int
    order_id: int 
    menu_item_id: int
    status: str
    quantity: int
    name: str | None
    price: float | None
    note: str
    date_added: str

    def set(self, name ,price):
        self.name = name
        self.price = price

class MenuItem(BaseModel):
    menu_item_id: int
    item_name: str
    price: float
    image_name: str
    date_added: str

class Order(BaseModel):
    order_id: int
    name: str
    status: str
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

def check_if_menu_item_exists(menu_item_id: str):
    query: str = '''
    select * from menu_items
    where menu_item_id = ?;
    '''
    res = db.cursor.execute(query,menu_item_id)
    if res.fetchone() == None:
        err: str = f"This menu item does not exists: {menu_item_id}"
        raise HTTPException(status_code=404, detail=err)
    return True

@router.get("/get-order/{order_id}", status_code=200)
async def get_order(order_id):
    check_if_order_exists(order_id)

    query: str = '''
    select * from orders
    where order_id=?;
    '''
    response = db.cursor.execute(query, order_id)
    response = response.fetchone()
    order: Order = Order(
            order_id=response[0],
            name=response[1],
            status=response[2],
            date_added=response[3],
            )
    return order

@router.get("/get-order-items-from-id/{order_id}", status_code=200)
async def get_order_items(order_id):
    check_if_order_exists(order_id)

    query: str = '''
    select * from order_items
    where order_id = ?;
    ''' 
    result = db.cursor.execute(query, order_id).fetchall()
    order_items = []
    menu_item_ids = []
    for item in result:
        order_item = OrderItems(
                order_item_id=item[0],
                order_id=item[1],
                menu_item_id=item[2],
                status=item[3],
                quantity=item[4],
                note=item[5],
                date_added=item[6],
                price=None,
                name=None,
                )
        menu_item_ids.append(item[2])
        order_items.append(order_item)

    print(order_items)
    for i in range(len(menu_item_ids)):
        query: str = '''
        select item_name, price from menu_items
        where menu_item_id = ?;
        '''
        check_if_menu_item_exists(str(menu_item_ids[i]))
        res = db.cursor.execute(query, str(menu_item_ids[i])).fetchone()
        order_items[i].set(res[0],res[1]) 
    return order_items

class RemoveOrderItemReq(BaseModel):
    order_item_id: str
@router.delete("/remove-order-item", status_code=204, responses={404: {}})
async def remove_order_item(request: RemoveOrderItemReq):
    order_item_id = request.order_item_id
    query: str = '''
    select * from order_items where order_item_id=?;
    '''
    res = db.cursor.execute(query, [order_item_id]).fetchone()
    if res == None:
        err: str = f'This order does not exists: {order_item_id}'
        raise HTTPException(status_code=404, detail=err)

    query: str = '''
    delete from order_items
    where order_item_id=?
    '''
    db.cursor.execute(query, (order_item_id))
    db.connection.commit()
    
    return

class AddOrderItemReq(BaseModel):
    order_id: str
    note: str
    menu_item_id: str
    quantity: str
@router.put("/add-order-item", status_code=204, responses= {404: {}})
async def add_order_item(request: AddOrderItemReq):
    order_id = request.order_id
    note = request.note
    menu_item_id = request.menu_item_id
    quantity = request.quantity

    query: str = '''
    select * from menu_items
    where menu_item_id = ?;
    '''
    res = db.cursor.execute(query,menu_item_id)
    if res.fetchone() == None:
        err: str = f"This menu item does not exists: {menu_item_id}"
        raise HTTPException(status_code=404, detail=err)

    check_if_order_exists(order_id)
    query: str = '''
    select ifnull(max(order_item_id),0) from order_items;
    '''
    max_id = db.cursor.execute(query).fetchone()[0]
    query: str = '''
    insert into order_items(order_item_id,order_id,note,menu_item_id,quantity,date_added)
    values(?,?,?,?,?,?);
    '''
    db.cursor.execute(query,(max_id + 1, order_id,note,menu_item_id,quantity,datetime.datetime.now()))
    db.connection.commit()
    return
