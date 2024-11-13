import { useEffect, useState } from "react"
import { formatDateTime } from "../../js/staff/Methods"


export default function ReceiptItemsHistory({order_id, receipt}) {
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
                <p className="w-[15vw]">Dish Name</p>
                <div className="flex gap-[2.5vw] mr-[1vw]">
                    <p className="w-[10vw] text-center">Quantity</p>
                    <p className="w-[10vw] text-center">Price</p>
                    <p className="w-[10vw] text-center">Amount</p>
                </div>                  
            </div>
            <div className="w-[100%] h-[0.1vw] bg-gunmetal"></div>
            <div className="flex flex-col">
                {orderItems.map((item, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center font-normal text-[1.3vw] py-[0.5vw]">
                            <p className="w-[15vw]">{item.name}</p>
                            <div className="flex gap-[2.5vw] mr-[1vw]">
                                <p className="w-[10vw] text-center">{item.quantity}</p>
                                <p className="w-[10vw] text-center">{item.price} A$</p>
                                <p className="w-[10vw] text-center">{Number((item.quantity * item.price).toFixed(2))} A$</p>
                            </div> 
                        </div>
                        <div className="w-[100%] h-[0.08vw] bg-gunmetal"></div>
                    </div>
                ))}
            </div>
            <div className="flex flex-row-reverse font-medium">
                <div className="right-0 w-[22vw] mr-[3vw] mt-[1vw]">
                    <div className="flex justify-between text-[1.4vw] my-[0.25vw]">
                        <p className="">Subtotal: </p>
                        <p className="font-normal">{receipt.total} A$</p>
                    </div>
                    <div className="flex justify-between text-[1.4vw] my-[0.25vw]">
                        <p className="">VAT (10%):</p>
                        <p className="font-normal">{(receipt.total * 0.1).toFixed(2)} A$</p>
                    </div>
                    <div className="w-[100%] h-[0.2vw] bg-gunmetal"></div>
                    <div className="flex justify-between text-[1.4vw] mt-[0.7vw]">
                        <p className="">Grand Total:</p>
                        <p className="font-normal">{receipt.total_after_tax} A$</p>
                    </div>
                    <div className="flex justify-between text-[1.4vw] mt-[0.7vw]">
                        <p className="">Paid Amount:</p>
                        <p className="font-normal">{receipt.amount_given} A$</p>
                    </div>
                    <div className="flex justify-between text-[1.4vw] mt-[0.7vw]">
                        <p className="">Change:</p>
                        <p className="font-normal">{Number(receipt.change.toFixed(2))} A$</p>
                    </div>
                </div>
            </div>
        </div>
    )
}