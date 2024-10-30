from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.index import router as index_router
from routers.customer import router as customer_router
from routers.kitchen import router as kitchen_router
from routers.manager import router as manager_router
from routers.cashier import router as cashier_router
from routers.waiter import router as waiter_router

origins = [
        "http://127.0.0.1:3000",
        "http://localhost:3000"
        ]

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
app.include_router(manager_router, prefix="/manager")
app.include_router(cashier_router, prefix="/cashier")
app.include_router(waiter_router, prefix="/waiter")
