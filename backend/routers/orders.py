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

class CountRes(BaseModel):
    menu_item_id: int 
    name: str
    count: int

class OnlineOrderItem(BaseModel):
    menu_item_id: int
    quantity: int
    note: str
class AddOnlineOrderReq(BaseModel):
    customer_name : str
    orders: list[OnlineOrderItem]

@router.put("/add-online-order", status_code=204)
async def add_online_order(request: AddOnlineOrderReq):
    query: str = '''
    select ifnull(max(order_id), 0) from orders;
    '''
    max_id: int = db.cursor.execute(query).fetchone()[0]

    query: str = '''
    insert into orders
    values(?,?,?,?,?);
    '''
    db.cursor.execute(query, (
        max_id + 1,
        request.customer_name,
        'PENDING',
        'ONLINE',
        datetime.datetime.now().isoformat()
        ))

    order_id = max_id + 1
    checks.check_if_invoice_exists(str(order_id))
    
    query: str = '''
    select ifnull(max(invoice_id),0) from invoices;
    '''
    max_invoice_id = db.cursor.execute(query).fetchone()[0]

    query: str ='''
    insert into invoices(invoice_id, order_id, date_added)
    values(?,?,?);
    '''
    db.cursor.execute(query, (max_invoice_id + 1, order_id, datetime.datetime.now().isoformat()))
    
    db.connection.commit()
    orders = []
    for order_item in request.orders:
        orders.append(AddOrderItemReq(
            order_id=order_id,
            menu_item_id=order_item.menu_item_id,
            quantity=order_item.quantity,
            note=order_item.note
            ))
    await add_order_item(orders)
    return

class RemoveOrderReq(BaseModel):
    order_id: int
@router.delete("/remove-order", status_code=204, responses={404: {}})
async def remove_order(request: RemoveOrderReq):
    order_id = request.order_id
    query: str = '''
    select * from orders where order_id=?;
    '''
    res = db.cursor.execute(query, [order_id]).fetchone()
    if res == None:
        err: str = f'This order does not exists: {order_id}'
        raise HTTPException(status_code=404, detail=err)

    query: str = '''
    delete from orders
    where order_id=?
    '''
    db.cursor.execute(query, [order_id])
    db.connection.commit()
    
    return
@router.get("/get-menu-item-count-from-date/{date}")
async def get_menu_item_count_from_date(date: str) -> list[CountRes]:
    date = f"%{date}%"
    response: list[CountRes] = []
    
    items: dict[int, CountRes] = {}
    query: str = '''
    select order_items.menu_item_id, menu_items.item_name, order_items.quantity from order_items
    inner join menu_items on order_items.menu_item_id=menu_items.menu_item_id and order_items.date_added like ?;
    '''
    res = db.cursor.execute(query, [date]).fetchall()
    if res == []:
        return []
    for item in res:
        if item[0] in items:
            items[item[0]].count += item[2]
        else:
            items[item[0]] = CountRes(
                    menu_item_id=item[0],
                    name=item[1],
                    count=item[2],
                    )
    for key in items:
        response.append(items[key])
    return response

@router.patch("/change-order-item-status/{order_item_id}",status_code=204)
async def change_order_item_status(order_item_id: int):
    query: str = '''
    select * from order_items
    where order_item_id=?;
    '''
    res = db.cursor.execute(query, [order_item_id]).fetchone()
    if res == None:
        err: str = f"This order item does not exist: {order_item_id}"
        raise HTTPException(status_code=404, detail=err)
    query: str = '''
    update order_items
    set status='COMPLETED'
    where order_item_id=?;
    '''
    db.cursor.execute(query, [order_item_id])
    db.connection.commit()
    return
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

    for i in range(len(menu_item_ids)):
        query: str = '''
        select item_name, price from menu_items
        where menu_item_id = ?;
        '''
        checks.check_if_menu_item_exists(str(menu_item_ids[i]))
        res = db.cursor.execute(query, [menu_item_ids[i]]).fetchone()
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

@router.get("/get-orders-from-date/{order_date}",status_code=200)
async def get_orders_from_date(order_date: str) -> list[Order]:
    order_date = f"%{order_date}%"
    response : list[Order] = []
    query: str = '''
    select * from orders
    where date_added like ?;
    '''
    res = db.cursor.execute(query, [order_date]).fetchall()
    for order in res:
        response.append(Order(
            order_id=order[0],
            name=order[1],
            status=order[2],
            order_type=order[3],
            date_added=order[4],
            ))
    return response

@router.get("/get-orders-from-name/{order_name}",status_code=200)
async def get_orders_from_name(order_name: str) -> list[Order]:
    order_name = f"%{order_name}%"
    response : list[Order] = []
    query: str = '''
    select * from orders
    where name like ?;
    '''
    res = db.cursor.execute(query, [order_name]).fetchall()
    for order in res:
        response.append(Order(
            order_id=order[0],
            name=order[1],
            status=order[2],
            order_type=order[3],
            date_added=order[4],
            ))
    return response

@router.get("/get-orders-from-status/{order_status}",status_code=200)
async def get_orders_from_status(order_status: str) -> list[Order]:
    order_status = f"%{order_status}%"
    response : list[Order] = []
    query: str = '''
    select * from orders
    where status like ?
    '''
    res = db.cursor.execute(query, [order_status]).fetchall()
    for order in res:
        response.append(Order(
            order_id=order[0],
            name=order[1],
            status=order[2],
            order_type=order[3],
            date_added=order[4],
            ))
    return response

@router.get("/get-orders-from-type/{order_type}",status_code=200)
async def get_orders_from_type(order_type: str) -> list[Order]:
    order_type = f"%{order_type}%"
    response : list[Order] = []
    query: str = '''
    select * from orders
    where type like ?
    '''
    res = db.cursor.execute(query, [order_type]).fetchall()
    for order in res:
        response.append(Order(
            order_id=order[0],
            name=order[1],
            status=order[2],
            order_type=order[3],
            date_added=order[4],
            ))
    return response

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

@router.get("/get-pending-order-items/{order_id}", status_code=200)
async def get_pending_order_items(order_id: int) -> list[OrderItem]:
    response: list[OrderItem] = []
    query: str ='''
    select * from order_items
    where status='PENDING' and order_id=?;
    '''
    res = db.cursor.execute(query, [order_id])
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
