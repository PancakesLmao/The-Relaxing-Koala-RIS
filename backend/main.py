from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import Db
from fastapi.responses import RedirectResponse

from .routers.customer import router as customer_router
from .routers.kitchen import router as kitchen_router
from .routers.staff import router as staff_router
from .routers.tables import router as tables_router
from .routers.orders import router as orders_router
from .routers.invoices import router as invoice_router
from .routers.receipts import router as receipt_router
from .routers.menus import router as menu_router

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

@app.get("/", response_class=RedirectResponse)
async def redirect_fastapi():
    return "/docs"

# include the routers here
app.include_router(customer_router, prefix="/customer")
app.include_router(receipt_router, prefix="/receipts")
app.include_router(invoice_router, prefix="/invoices")
app.include_router(kitchen_router, prefix="/kitchen")
app.include_router(menu_router, prefix="/menus")
app.include_router(staff_router, prefix="/staff")
app.include_router(tables_router, prefix="/tables")
app.include_router(orders_router, prefix="/orders")
