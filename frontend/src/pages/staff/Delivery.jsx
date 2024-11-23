import { useEffect, useState } from "react";
import { getCookie } from "../../js/staff/Methods";
import SingleOnlineOrder from "../../components/staff/SingleOnlineOrder";


export default function Delivery() {
    const [onlineOrders, setOnlineOrders] = useState([])
    const [fetchOnlineOrders, setFetchOnlineOrders] = useState(true)

    useEffect(() => {
        if (fetchOnlineOrders) {
            fetch("http://127.0.0.1:8000/orders/get-orders-from-type/ONLINE").then(
                response => {
                    if (response.status === 200) {
                        return response.json()
                    }
                }
            ).then(data => {
                const filteredData = data.filter((item) => item.status === "PENDING")
                setOnlineOrders(filteredData)
            }).finally(() => {
                setFetchOnlineOrders(false)
            })
        }
        
    }, [fetchOnlineOrders])
    return (
        <div className="pl-[1vw]">
            <div className="flex pt-[1.2vw] justify-between h-[10vh]">
                <div className="text-[2.4vw] font-medium pt-[0.6vw]">
                    Delivery Order Management
                </div>
                <div className="flex gap-[1vw] items-center">
                    <div className="flex flex-col font-medium text-right text-[1.2vw]">
                        <p>{getCookie("name")}</p>
                        <p>{getCookie("role")}</p>
                    </div>
                    <i className="material-symbols-outlined text-[4vw] act-circ">account_circle</i>
                </div> 
            </div>
            <div className="h-[0.2vw] w-[100%] bg-gunmetal"></div>
            <div className="flex gap-[4vw] font-medium text-[1.5vw] ml-[2vw] py-[0.7vw]">
                <p className="w-[2vw]">ID</p>
                <p className="w-[7vw] text-center">Type</p>
                <p className="w-[18vw]">Name</p>
                <p className="w-[18vw]">Date and Time</p>
                <p className="w-[14vw]">Delivery ID</p>
            </div>    
            {onlineOrders.map((order, index) => (
                <SingleOnlineOrder key={index} order={order} setFetchOnlineOrders={setFetchOnlineOrders}/>
            ))}                
        </div>
    )
}