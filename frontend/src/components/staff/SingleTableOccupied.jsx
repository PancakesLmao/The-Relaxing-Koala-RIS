import { useEffect, useState } from "react";
import TableOrderList from "./TableOrderList";
import ReceiptDisplay from "./ReceiptDisplay";

export default function SingleTableOccupied({selectedTable, setSelectedTable}) {
    const [orderInfor, setOrderInfor] = useState({})
    const [checkoutModal, setCheckoutModal] = useState(false)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/orders/get-order/${selectedTable.order_id}`).then(
            response => {
                if (response.status === 200) {

                    return response.json()
                }

                return Promise.reject()
            }
        ).then((data) => {
            setOrderInfor(data);
        }).catch((response) => {
            response.json().then((data) => {
                console.error(data)
            })
        })
    }, [selectedTable.order_id, selectedTable.table_status])

    
    
    return (
        <div className="bg-white text-center">
            <div className="px-[2.5vw] pt-[3.5vw] pb-[7.2vw] font-medium">
                <h1 className="text-[2vw]">Table No. {selectedTable.table_number}</h1>
                <div className="m-auto h-[0.25vw] w-[60%] bg-gunmetal"></div>
                <h2 className="text-[1.7vw] mt-[2vw]">Order Detail</h2>
                <div className="m-auto h-[0.25vw] w-[100%] bg-gunmetal"></div>
                <div className="mt-[0.7vw] text-[1.3vw] text-left">
                    <div>Name: {orderInfor.name}</div>
                    <div>Order ID: {orderInfor.order_id}</div>
                    <div>Date: {orderInfor.date_added}</div>
                    <div className="text-red">Invoice Created!</div>
                    <div className="mt-[0.7vw] flex">
                        <TableOrderList orderId={selectedTable.order_id}/>
                    </div>
                </div>
            </div>
            <div className="bg-gunmetal fixed bottom-0 w-[27vw] h-[5vw] flex flex-row justify-evenly box-border py-[1vw] font-medium text-[1.2vw]">
                <button className="bg-honeydew w-[11vw] rounded-[0.7vw]">
                    Generate Invoice
                </button>
                <button className="bg-red w-[11vw] text-white rounded-[0.7vw]" onClick={() => setCheckoutModal(true)}>
                    Check-out
                </button>
            </div> 
            {checkoutModal && (
                <div className="check-out-modal">
                    <div className="w-screen h-screen top-0 left-0 bottom-0 right-0 fixed staff-overlay">
                        <div className="bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
                        w-[50vw] h-[40vw] overflow-auto box-border">
                            <i className="ri-close-line absolute leading-[1] top-[1vw] right-[1vw] bg-gunmetal text-honeydew text-[2.1vw] cursor-pointer z-10"
                                onClick={() => setCheckoutModal(false)}></i>
                            <div className="text-left font-medium relative p-[1vw] pb-[2.5vw]">
                                <h1 className="text-[1.7vw]">Check-out Confirmation</h1>
                                <div className="h-[0.25vw] w-[100%] bg-gunmetal mt-[-0.1vw]"></div>
                                <h1 className="text-[1.4vw] mt-[1vw]">Table No. 1</h1>
                                <div className="h-[0.25vw] w-[7.2vw] bg-gunmetal mt-[-0.1vw]"></div>
                                <div className="flex flex-col gap-[0.2vw] mt-[0.5vw] text-[1.3vw]">
                                    <p>Invoice ID:</p>
                                    <p>Order ID:</p>
                                    <p>Customer's Name</p>
                                    <p>Date</p>
                                </div>
                                <div className="mt-[1vw]">
                                    <ReceiptDisplay />
                                </div>
                                <div className="flex flex-row-reverse mr-[1.45vw] mt-[2vw]">
                                    <form className="flex flex-col">
                                        <label htmlFor="payment">Payment Method</label>
                                        <select className="w-[17vw] border-[0.2vw] border-gray-400 font-normal" name="payment" id="payment">
                                            <option value="cash">Cash</option>
                                            <option value="Credit Card">Credit Card</option>
                                        </select>
                                        <label className="mt-[1.5vw]"htmlFor="amount">Paid Amount:</label>
                                        <input className="w-[17vw] border-b-[0.2vw] border-gray-400 font-normal" type="number" id="amount" name="amount"></input>
                                    </form>
                                </div>    
                            </div>
                            <button className="sticky bottom-0 left-0 bg-red w-[100%] text-[1.5vw] font-medium text-white h-[3.1vw] text-center"
                                onClick={() => {
                                    setCheckoutModal(false)
                                    setSelectedTable(null)
                                }}>
                                Proceed to Check-out
                            </button>
                        </div>
                        
                    </div>
                </div>
            )}     
        </div>
    )
}