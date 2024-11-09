from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..db import Db
import re
import datetime

db = Db("db.sqlite")
router = APIRouter()

class MenuItem(BaseModel):
    menu_item_id: int
    item_name: str
    price: float
    image_name: str
    date_added: str

menu_items: list[MenuItem] = []

def to_snake_case(string: str) -> str:
    new = string.split(" ")
    s1 = new[0].lower()
    s2 = new[1].lower()
    return "_".join([s1,s2])

def init_menu_items():
    items = {
            'Fish Tacos' : 16.95,
            'Charcuterie Board': 39.00,
            'Local Prawn Cocktail': 32.00,
            'Roasted Pumpkin': 21.00,
            'Wild Forest Mushroom Arancini': 18.00,
            'Yot Deck Beef Burger': 28.00,
            'Local Black Mussels': 26.00,
            'Chicken Souvlaki': 25.00,
            '250gm Rump': 29.00,
            'Fettuccine Prawn Lemoni': 30.00,
            'Passionfruit Sunset': 18.00,
            'Grape Spritz': 15.00,
            }
    if menu_items == []:
        for name,price in items.items():
            menu_item = MenuItem(
                    menu_item_id=list(items).index(name),
                    item_name=name,
                    price=price,
                    image_name=to_snake_case(name),
                    date_added=datetime.datetime.now().isoformat()
                    )
            menu_items.append(menu_item)
            
    query: str = '''
    delete from menu_items;
    '''
    db.cursor.execute(query)
    db.connection.commit()
    for menu_item in menu_items:
        query = '''
        insert into menu_items
        values
        (?,?,?,?,?);
        '''
        db.cursor.execute(query, (
            menu_item.menu_item_id,
            menu_item.item_name,
            menu_item.price,
            menu_item.image_name,
            menu_item.date_added,
                                  )
                          )
    db.connection.commit()

    return
init_menu_items()
    
@router.get("/get-menu-items", status_code=200)
async def get_menu_items() -> list[MenuItem]:
    response: list[MenuItem] = []
    query: str = '''
    select * from menu_items;
    '''
    res = db.cursor.execute(query).fetchall()
    for menu_item in res:
        response.append(MenuItem(
            menu_item_id=menu_item[0],
            item_name=menu_item[1],
            price=menu_item[2],
            image_name=menu_item[3],
            date_added=menu_item[4],
            ))
    return response
