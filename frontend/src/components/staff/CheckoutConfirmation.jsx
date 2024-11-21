import { useRef } from "react"
import ReceiptDisplay from "./ReceiptDisplay"

export default function CheckoutConfirmation({selectedTable, invoice, setCheckoutModal, setSelectedTable, setFetchTables}) {
    const paymentMethod = useRef("")
    const amount = useRef(0)

    function checkoutHandler(event) {
        event.preventDefault()
        
        const newReceipt = {
            invoice_id: invoice.invoice_id,
            order_id: invoice.order_id,
            total: invoice.total,
            total_after_tax: Number((invoice.total + Number((invoice.total * 0.1).toFixed(2))).toFixed(2)),
            payment_method: paymentMethod.current.value,
            amount_given: Number(amount.current.value),
            table_number: selectedTable.table_number
        }

        fetch("http://127.0.0.1:8000/receipts/check-out", {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(newReceipt)
        }).then((response) => {
            if (response.status === 204) {
                setCheckoutModal(false)
                setSelectedTable(null)
                setFetchTables(true)
            }
        })
    }
    return (
        <div className="bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
        w-[50vw] h-[40vw] overflow-auto box-border">
            <i className="ri-close-line absolute leading-[1] top-[1vw] right-[1vw] bg-gunmetal text-honeydew text-[2.1vw] cursor-pointer z-10"
                onClick={() => setCheckoutModal(false)}></i>
            <div className="text-left font-medium relative p-[1vw] pb-[2.5vw]">
                <h1 className="text-[1.7vw]">Check-out Confirmation</h1>
                <div className="h-[0.25vw] w-[100%] bg-gunmetal mt-[-0.1vw]"></div>
                <h1 className="text-[1.4vw] mt-[1vw]">Table No. {selectedTable.table_number}</h1>
                <div className="h-[0.25vw] w-[7.2vw] bg-gunmetal mt-[-0.1vw]"></div>
                <div className="flex flex-col gap-[0.2vw] mt-[0.5vw] text-[1.3vw]">
                    <p>Invoice ID: {invoice.invoice_id}</p>
                    <p>Order ID: {invoice.order_id}</p>
                    <p>Customer's Name: {invoice.customer_name}</p>
                    <p>Date: {invoice.date_added}</p>
                </div>
                <div className="mt-[1vw]">
                    <ReceiptDisplay receipt={invoice}/>
                </div>
                <div className="flex flex-row-reverse mr-[1.45vw] mt-[2vw]">
                    <form className="flex flex-col">
                        <label className="text-[1.2vw]" htmlFor="payment">Payment Method</label>
                        <select className="w-[17vw] border-[0.2vw] border-gray-400 font-normal" name="payment" id="payment" ref={paymentMethod}>
                            <option value="Cash">Cash</option>
                            <option value="Credit Card">Credit Card</option>
                        </select>
                        <label className="mt-[1.5vw] text-[1.2vw]"htmlFor="amount">Paid Amount:</label>
                        <input className="w-[17vw] border-b-[0.2vw] border-gray-400 font-normal" type="number" id="amount" name="amount" ref={amount}></input>
                    </form>
                </div>    
            </div>
            <button className="sticky bottom-0 left-0 bg-red w-[100%] text-[1.5vw] font-medium text-white h-[3.1vw] text-center"
                onClick={(e) => {
                    checkoutHandler(e)
                }}>
                Proceed to Check-out
            </button>
        </div>
    )
}