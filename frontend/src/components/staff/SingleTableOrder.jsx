import { useEffect, useState } from "react";
import MenuOrderList from "./MenuOrderList";
import NewOrderItems from "./NewOrderItems";
import { useNewOrderContext } from "../../context/staff/NewOrderContext";


export default function SingleTableOrder({selectedTable, setSelectedTable}) {
    const [orderInfor, setOrderInfor] = useState({})
    const {clearOrder, newOrders} = useNewOrderContext();
    const [fetchOrderItems, setFetchOrderItems] = useState(true);

    useEffect(() => {
        if (selectedTable.table_status === "OCCUPIED") {
            fetch(`http://127.0.0.1:8000/orders/get-order/${selectedTable.order_id}`).then(
                response => {
                    if (response.status === 200) {
    
                        return response.json()
                    }
    
                    return Promise.reject()
                }
            ).then((data) => {
                setOrderInfor(data);
            })
        }
    }, [selectedTable])

    function newOrderSubmitHandler() {
        let submitOrder = []
        for (const newItem of newOrders) {
            submitOrder.push({
                order_id: selectedTable.order_id,
                note: newItem.notes,
                menu_item_id: newItem.menu_item.menu_item_id,
                quantity: newItem.quantity
            })
        }

        if (submitOrder.length > 0) {
            fetch("http://127.0.0.1:8000/orders/add-order-items", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitOrder)
            }).then(
                response => {
                    if (response.status === 204) {
                        clearOrder()
                        setFetchOrderItems(true)
                    }
                }
            )
        }
    }
    
    return (
        <div className="relative text-center font-medium">
            <div className="px-[2vw] pt-[2vw] pb-[5vw]">
                <i className="ri-arrow-left-line text-gunmetal text-[3vw] absolute top-0 left-0 leading-[1] cursor-pointer"
                    onClick={() => {
                        clearOrder();
                        setSelectedTable(null);
                    }}></i>
                <h1 className="text-[2vw]">Table No. {selectedTable.table_number}</h1>
                <div className="m-auto h-[0.25vw] w-[60%] bg-gunmetal"></div>
                {selectedTable.table_status === "OCCUPIED" ?
                    <>
                        <h2 className="text-[1.7vw] mt-[2vw]">Order Detail</h2>
                        <div className="m-auto h-[0.25vw] w-[100%] bg-gunmetal"></div>
                        <div className="mt-[0.7vw] text-[1.3vw] text-left">
                            <div>Order ID: {orderInfor.order_id}</div>
                            <div>Name: {orderInfor.name}</div>
                            <div>Date: {orderInfor.date_added}</div>
                        </div>
                        <div className="my-[1vw]">
                            <MenuOrderList orderId={orderInfor.order_id} fetchOrderItems={fetchOrderItems} setFetchOrderItems={setFetchOrderItems}/>
                        </div>
                        <div className="m-auto h-[0.25vw] w-[100%] bg-gunmetal"></div>
                        <h2 className="text-[1.7vw] mt-[0.5vw]">Newly Added</h2>
                        <div className="my-[1vw]">
                            <NewOrderItems />
                        </div>
                    </>
                    :
                    <div className="font-medium text-[1.8vw] mt-[15vw]">
                        <p className="">This table is not occupied</p>
                        <p>Please select another table</p>
                    </div>
                } 
            </div>
            {selectedTable.table_status === "OCCUPIED" && (
                <div className="bg-gunmetal fixed bottom-0 w-[27vw] h-[5vw] flex flex-row justify-evenly box-border py-[1vw] font-medium text-[1.2vw]">
                    <button className="bg-honeydew w-[90%] text-gunmetal rounded-[0.7vw]"
                        onClick={() => newOrderSubmitHandler()}>
                        Submit
                    </button> 
                </div>
            )}
             
        </div>
    )
}