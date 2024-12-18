import { useEffect, useState } from "react"


export default function MenuOrderList({orderId, fetchOrderItems, setFetchOrderItems}) {
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        if (orderId && fetchOrderItems) {
            fetch(`http://127.0.0.1:8000/orders/get-order-items-from-id/${orderId}`).then(
                response => {
                    if (response.status === 200) {
                        return response.json()
                    }
    
                    return Promise.reject()
                }
            ).then(data => {
                setOrderItems(data)
            }).catch(response => {
                response.json().then(data => console.error(data))
            }).finally(() => {
                setFetchOrderItems(false)
            })
        }   
    }, [orderId, fetchOrderItems, setFetchOrderItems])

    function deleteItemHandler(item) {
        if (item === null) {
            return
        }

        fetch("http://127.0.0.1:8000/orders/remove-order-item", {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                order_item_id: item.order_item_id,
            })
        }).then(
            response => {
                if (response.status === 204) {
                    console.log("Success")
                    setFetchOrderItems(true)
                }
            }
        )
    }

    return (
        <div className="border-box w-[100%] flex flex-col gap-[1vw] mt-[1vw]">
            {orderItems.map((item, index) => (
                <div key={index} className="bg-antiflash-white flex gap-[1.5vw] items-center py-[1vw] px-[1.2vw]">
                    <div className="flex-1">
                        <div className="text-left">
                            <p className="text-[1.3vw]">{index + 1}. {item.name} x{item.quantity}</p>
                            <p className="font-normal">Price: {Number((item.price * item.quantity).toFixed(2))} A$</p>
                            {item.note && (<p className="font-normal">Note: {item.note} </p>)}
                        </div>
                    </div>
                    <div className="w-auto flex items-center gap-[1.7vw]">
                        {
                            (() => {
                                if (item.status === "PENDING") {
                                    return (
                                        <i className="ri-knife-line leading-[1] text-[1.9vw]"></i>
                                    )
                                } 

                                if (item.status === "COMPLETED") {
                                    return (
                                        <i className="ri-check-line leading-[1] text-[2.1vw]"></i>
                                    )
                                }
                            })()
                        }
                        <i className="ri-close-line leading-[1] text-[2.3vw] text-white bg-red p-[0.1vw] rounded-[0.5vw] cursor-pointer"
                            onClick={() => deleteItemHandler(item)}></i>
                    </div>
                </div>
            ))}           
        </div>
    )
}