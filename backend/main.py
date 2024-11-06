from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import Db

from .routers.index import router as index_router
from .routers.customer import router as customer_router
from .routers.kitchen import router as kitchen_router
from .routers.staff import router as staff_router
from .routers.tables import router as tables_router
from .routers.orders import router as orders_router

origins = [
        "http://127.0.0.1:3000",
        "http://localhost:3000"
        ]

db = Db("db.sqlite")
app = FastAPI()
app.add_middleware(
        CORSMiddleware,
        allow_origins = origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        )

# include the routers here
app.include_router(index_router)
app.include_router(customer_router, prefix="/customer")
app.include_router(kitchen_router, prefix="/kitchen")
app.include_router(staff_router, prefix="/staff")
app.include_router(tables_router, prefix="/tables")
app.include_router(orders_router, prefix="/orders")
