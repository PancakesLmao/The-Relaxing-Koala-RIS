import { useEffect, useState } from "react"


export default function OnlineItems({order, setFetchOnlineOrders}) {
    const [orderItems, setOrderItems] = useState([])
    const [receipt, setReceipt] = useState({})
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/orders/get-order-items-from-id/${order.order_id}`).then(
            response => {
                if (response.status === 200) {
                    return response.json()
                }
            }
        ).then(data => {
            setReceipt(receiptCalculation(data))
            setOrderItems(data)
        }).catch(response => {
            console.log(response)
            setOrderItems([])
        })
    }, [order.order_id])

    function checkOutOnline() {
        fetch(`http://127.0.0.1:8000/invoices/get-single-invoice/${order.order_id}`).then(
            response => {
                if (response.status === 200) {
                    return response.json()
                }
            }
        ).then(data => {
            console.log({
                invoice_id: data.invoice_id,
                order_id: order.order_id,
                total: receipt.total,
                total_after_tax: receipt.total_after_tax,
                payment_method: "Credit Card",
                amount_given: receipt.total_after_tax     
            })
            fetch('http://127.0.0.1:8000/receipts/online-check-out', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    invoice_id: data.invoice_id,
                    order_id: order.order_id,
                    total: receipt.total,
                    total_after_tax: receipt.total_after_tax,
                    payment_method: "Credit Card",
                    amount_given: receipt.total_after_tax     
                })
            })
        }).finally(() => {
            setFetchOnlineOrders(true)
        })
    }

    function removeOrder() {
        fetch('http://127.0.0.1:8000/orders/remove-order', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_id: order.order_id
            })
        }).then(() => {
            setFetchOnlineOrders(true)
        })
    }

    function receiptCalculation(orders) {
        let receipt = {
            total: 0,
            tax: 0,
            total_after_tax: 0
        }

        for (let i = 0; i < orders.length; i++) {
            receipt.total += Number((orders[i].price * orders[i].quantity).toFixed(2))
        }

        receipt.tax = Number((receipt.total * 0.1).toFixed(2))
        receipt.total_after_tax = Number((receipt.total + receipt.tax).toFixed(2))

        return receipt
    }
    return (
        <div className="bg-white w-[100%] px-[1vw] py-[1.2vw]">
            <div className="flex justify-between items-center font-medium text-[1.3vw]">
                <div className="flex gap-[2.5vw]">
                    <p className="w-[15vw]">Dish Name</p>
                    <p className="w-[15vw]">Note</p>
                    <p className="w-[8vw] text-center">Status</p>
                </div>   
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
                            <div className="flex items-center gap-[2.5vw]">
                                <p className="w-[15vw]">{item.name}</p>
                                <p className="w-[15vw]">{item.note}</p>
                                <p className="w-[8vw] text-center">{item.status}</p>
                            </div>
                            <div className="flex gap-[2.5vw] mr-[1vw]">
                                <p className="w-[10vw] text-center">{item.quantity}</p>
                                <p className="w-[10vw] text-center">{item.price} A$</p>
                                <p className="w-[10vw] text-center">{Number((item.price * item.quantity).toFixed(2))} A$</p>
                            </div> 
                        </div>
                        <div className="w-[100%] h-[0.08vw] bg-gunmetal"></div>
                    </div>
                ))} 
            </div>
            {receipt && (
                <div className="flex flex-row-reverse font-medium">
                    <div className="right-0 w-[22vw] mr-[3vw] mt-[1vw]">
                        <div className="flex justify-between text-[1.4vw] my-[0.25vw]">
                            <p className="">Subtotal: </p>
                            <p className="font-normal">{receipt.total} A$</p>
                        </div>
                        <div className="flex justify-between text-[1.4vw] my-[0.25vw]">
                            <p className="">VAT (10%):</p>
                            <p className="font-normal">{receipt.tax} A$</p>
                        </div>
                        <div className="w-[100%] h-[0.2vw] bg-gunmetal"></div>
                        <div className="flex justify-between text-[1.4vw] mt-[0.7vw]">
                            <p className="">Grand Total:</p>
                            <p className="font-normal">{receipt.total_after_tax} A$</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-row-reverse mt-[3vw] mr-[1vw] gap-[2vw] font-medium text-[1.3vw] text-white">
                <button className="bg-lime-green py-[0.4vw] w-[9vw] rounded-[0.7vw]" onClick={() => checkOutOnline()}>Check-out</button>
                <button className="bg-red py-[0.4vw] w-[9vw] rounded-[0.7vw]" onClick={() => removeOrder()}>Delete</button>
            </div>       
            
        </div>
    )
}