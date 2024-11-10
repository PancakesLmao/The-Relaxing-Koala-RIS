import { useEffect, useState } from "react"


export default function ReceiptDisplay({receipt}) {
    const [receiptState, setReceiptState] = useState({...receipt, order_items: null})
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/orders/get-order-items-from-id/${receipt.order_id}`).then(
            response => {
                if (response.status === 200) {
                    return response.json()
                }
    
                return Promise.reject()
            }
        ).then((data) => {
            setReceiptState({
                ...receiptState,
                order_items: data
            })
        }).catch(() => {
            setReceiptState({
                ...receiptState,
                order_items: null,
            })
        })
    }, [receipt]) 
    

    return (
        <div>
            <div className="text-[1.3vw]">
                <div className="flex flex-row justify-between">
                    <p>Dish Name</p>
                    <div className="flex flex-row gap-[1.7vw] text-center">
                        <p className="w-[6vw]">Quantity</p>
                        <p className="w-[6vw]">Price</p>
                        <p className="w-[6vw]">Amount</p>
                    </div>
                </div>
                <div className="w-[100%] h-[0.25vw] bg-gunmetal"></div>
            </div>

            {
                (() => {
                    if (receiptState.order_items === null) {
                        return (
                            <div className="font-normal text-[1.2vw] h-[20vw]">
                            
                            </div> 
                        )
                        
                    } else {
                        return receiptState.order_items.map((order_item, index) => (
                            <div key={index} className="font-normal text-[1.2vw]">
                                <div className="flex flex-row justify-between my-[0.5vw]">
                                    <p>{order_item.name}</p>
                                    <div className="flex flex-row gap-[1.7vw] text-center">
                                        <p className="w-[6vw]">{(order_item.quantity)}</p>
                                        <p className="w-[6vw]">{(order_item.price)} A$</p>
                                        <p className="w-[6vw]">{Number((order_item.quantity * order_item.price).toFixed(2))} A$</p>
                                    </div>
                                </div>
                                <div className="w-[100%] h-[0.1vw] bg-gunmetal"></div>
                            </div>
                        ))
                    }
                })()
            }    
            <div className="flex flex-row-reverse">
                <div className="right-0 w-[17vw] mr-[1.45vw] mt-[1vw]">
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
                        <p className="font-normal">{receipt.total + Number((receipt.total * 0.1).toFixed(2))} A$</p>
                    </div>
                </div>
            </div>          
        </div>
    )
}