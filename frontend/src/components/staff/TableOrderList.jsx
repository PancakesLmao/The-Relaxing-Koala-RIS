import { useEffect, useState } from "react"


export default function TableOrderList({orderId}) {
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/orders/get-order-items-from-id/${orderId}`).then(
            response => {
                if (response.status === 200) {

                    return response.json()
                }

                return Promise.reject()
            }
        ).then((data) => {
            setOrderItems(data);
        }).catch((response) => {
            console.error(response)
        })
    }, [orderId])

    return (
        <div className="border-box w-[100%] flex flex-col gap-[1vw] mt-[1vw]">
            {orderItems.map((orderItem, index) => (
                <div key={index + 1} className="bg-antiflash-white flex justify-between items-center py-[1vw] px-[2vw]">
                    <div>
                        <p className="text-[1.3vw]">{index + 1}. {orderItem.name}</p>
                        <p className="font-normal">Price: {orderItem.price} A$</p>
                    </div>
                    <p className="font-normal text-[1.5vw]">x{orderItem.quantity}</p>
                </div>
            ))}

        </div>
    )
}