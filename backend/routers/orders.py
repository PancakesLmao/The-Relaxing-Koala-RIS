from fastapi import APIRouter, HTTPException
from ..db import Db
from .. import checks
from pydantic import BaseModel
import datetime

router = APIRouter()

db = Db("db.sqlite")

class OrderItem(BaseModel):
    order_item_id: int | None
    order_id: int 
    menu_item_id: int
    status: str = "PENDING"
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
    order_type: str
    date_added: str

@router.get("/get-all-orders", status_code=200, response_model=list[Order])
async def get_orders():
    orders: list[Order] = []
    query: str = '''
    select * from orders;
    '''
    res = db.cursor.execute(query)
    for order in res:
        orders.append(Order(
            order_id=order[0],
            name=order[1],
            status=order[2],
            order_type=order[3],
            date_added=order[4],
            ))
    return orders

@router.get("/get-order/{order_id}", status_code=200, response_model=Order)
async def get_order(order_id):
    checks.check_if_order_exists(order_id)
    order: Order

    query: str = '''
    select * from orders
    where order_id=?;
    '''
    response = db.cursor.execute(query, [order_id])
    response = response.fetchone()
    order = Order(
            order_id=response[0],
            name=response[1],
            status=response[2],
            order_type=response[3],
            date_added=response[4],
            )

    return order

@router.get("/get-order-items-from-id/{order_id}", status_code=200, response_model=list[OrderItem])
async def get_order_items(order_id):
    checks.check_if_order_exists(order_id)

    query: str = '''
    select * from order_items
    where order_id = ?;
    ''' 
    result = db.cursor.execute(query, [order_id]).fetchall()
    order_items = []
    menu_item_ids = []
    for item in result:
        order_item = OrderItem(
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
        checks.check_if_menu_item_exists(str(menu_item_ids[i]))
        res = db.cursor.execute(query, str(menu_item_ids[i])).fetchone()
        order_items[i].set(res[0],res[1]) 
    return order_items

class RemoveOrderItemReq(BaseModel):
    order_item_id: int
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
    db.cursor.execute(query, [order_item_id])
    db.connection.commit()
    
    return

class AddOrderItemReq(BaseModel):
    order_id: int
    note: str
    menu_item_id: int
    quantity: int
@router.put("/add-order-items", status_code=204, responses= {404: {}})
async def add_order_item(request:list[AddOrderItemReq]):
    order_items = []
    for order_item in request:
        order_items.append(OrderItem(
            order_item_id=None,
            name=None,
            price=None,
            order_id= order_item.order_id,
            note=order_item.note,
            menu_item_id= order_item.menu_item_id,
            quantity= order_item.quantity,
            date_added= datetime.datetime.now().isoformat()
            ))
    for order_item in order_items:

        query: str = '''
        select * from menu_items
        where menu_item_id = ?;
        '''
        res = db.cursor.execute(query,[order_item.menu_item_id])
        if res.fetchone() == None:
            err: str = f"This menu item does not exists: {order_item.menu_item_id}"
            raise HTTPException(status_code=404, detail=err)

        checks.check_if_order_exists(order_item.order_id)
        query: str = '''
        select ifnull(max(order_item_id),0) from order_items;
        '''
        max_id = db.cursor.execute(query).fetchone()[0]
        query: str = '''
        insert into order_items(order_item_id,order_id,note,menu_item_id,quantity,date_added)
        values(?,?,?,?,?,?);
        '''
        db.cursor.execute(query,(
            max_id + 1,
            order_item.order_id,
            order_item.note,
            order_item.menu_item_id,
            order_item.quantity,
            order_item.date_added))

    db.connection.commit()
    return

@router.get("/get-pending-orders", status_code=200)
async def get_pending_orders() -> list[Order]:
    response = []
    query: str ='''
    select * from orders
    where status= 'PENDING';
    '''
    res = db.cursor.execute(query)
    for order in res:
        response.append(Order(
            order_id=order[0],
            name=order[1],
            status=order[2],
            order_type=order[3],
            date_added=order[4],
            ))
    return response

@router.get("/get-pending-order-items", status_code=200)
async def get_pending_order_items() -> list[OrderItem]:
    response: list[OrderItem] = []
    query: str ='''
    select * from order_items
    where status= 'PENDING';
    '''
    res = db.cursor.execute(query)
    menu_item_ids = []
    for order_item in res:
        menu_item_ids.append(order_item[2])
        response.append(OrderItem(
            order_item_id=order_item[0],
            order_id=order_item[1],
            menu_item_id=order_item[2],
            status=order_item[3],
            quantity=order_item[4],
            note=order_item[5],
            date_added=order_item[6],
            name=None,
            price=None,
            ))
    for i in range(len(menu_item_ids)):
        query: str = '''
        select item_name,price from menu_items
        where menu_item_id = ?;
        '''
        res = db.cursor.execute(query, [menu_item_ids[i]]).fetchone()
        response[i].set(res[0],res[1])
    return response
