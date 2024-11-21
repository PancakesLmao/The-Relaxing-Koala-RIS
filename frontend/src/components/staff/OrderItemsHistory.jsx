import { useEffect, useState } from "react"
import { formatDateTime } from "../../js/staff/Methods"


export default function OrderItemsHistory({order_id}) {
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/orders/get-order-items-from-id/${order_id}`).then(
            response => {
                if (response.status === 200) {
                    return response.json()
                }
            }
        ).then(data => {
            setOrderItems(data)
        }).catch(response => {
            console.log(response)
            setOrderItems([])
        })
    }, [order_id])

    return (
        <div className="bg-white w-[100%] px-[1vw] py-[1.2vw]">
            <div className="flex justify-between items-center font-medium text-[1.3vw]">
                <div className="flex gap-[2.5vw]">
                    <p className="w-[15vw]">Dish Name</p>
                    <p className="w-[8vw] text-center">Quantity</p>
                    <p className="w-[15vw]">Date and Time</p>
                    <p className="w-[20vw]">Note</p>
                </div>
                <p className="mr-[1vw] w-[10vw] text-center">Status</p>
            </div>
            <div className="w-[100%] h-[0.1vw] bg-gunmetal"></div>
            <div className="flex flex-col">
                {orderItems.map((item, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center font-normal text-[1.3vw] py-[0.5vw]">
                            <div className="flex items-center gap-[2.5vw]">
                                <p className="w-[15vw]">{item.name}</p>
                                <p className="w-[8vw] text-center">{item.quantity}</p>
                                <p className="w-[15vw]">{formatDateTime(item.date_added)}</p>
                                <p className="w-[20vw]">{item.note}</p>
                            </div>
                            <p className="mr-[1vw] w-[10vw] text-center">{item.status}</p>
                        </div>
                        <div className="w-[100%] h-[0.08vw] bg-gunmetal"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}