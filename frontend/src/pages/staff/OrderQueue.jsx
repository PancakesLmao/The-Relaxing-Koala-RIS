import { useEffect, useState } from "react";
import OrderQueueItem from "../../components/staff/OrderQueueItem";

export default function OrderQueue() {
    const [orders, setOrders] = useState([]);
    const [fetchOrder, setFetchOrder] = useState(true);

    useEffect(() => {
        if (fetchOrder) {
            fetch("http://127.0.0.1:8000/orders/get-pending-orders").then(
                response => {
                    if (response.status === 200) {
                        return response.json()
                    }
                }
            ).then(data => {
                setOrders(data)
            }).finally(
                setFetchOrder(false)
            )
        }
    }, [fetchOrder])
    return (
        <div className="pl-[1vw]">
            <div className="flex pt-[1.2vw] justify-between h-[10vh]">
                <div className="text-[2.4vw] font-medium pt-[0.6vw]">
                    Order Queue
                </div>
                <i className="material-symbols-outlined text-[4vw] act-circ">account_circle</i>
            </div>
            <div className="h-[0.2vw] w-[100%] bg-gunmetal"></div>
            <div className="flex mt-[1.5vw] w-full gap-[1vw] overflow-x-scroll min-h-[86.5vh]">
                {orders.map((order, index) => (
                    <OrderQueueItem key={index} order={order} setFetchOrder={setFetchOrder}/>
                ))}
            </div>
                    
        </div>
    )
}