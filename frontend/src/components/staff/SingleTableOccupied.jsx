import { useEffect, useState } from "react";
import TableOrderList from "./TableOrderList";
import CheckoutConfirmation from "./CheckoutConfirmation";
import { formatDateTime } from "../../js/staff/Methods";

export default function SingleTableOccupied({selectedTable, setSelectedTable, setFetchTables}) {
    const [orderInfor, setOrderInfor] = useState({})
    const [invoice, setInvoice] = useState(null)
    const [checkoutModal, setCheckoutModal] = useState(false)
    const [fetchOrder, setFetchOrder] = useState(true)

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

        fetch(`http://127.0.0.1:8000/invoices/get-single-invoice/${selectedTable.order_id}`).then(
            response => {
                if (response.status === 200) {
                    return response.json()
                }

                return Promise.reject()
            }
        ).then((data) => {
            setInvoice(data)
        }).catch(() => {
            setInvoice(null)
        })
    }, [selectedTable.order_id, fetchOrder, setFetchOrder])

    function generateInvoiceHandler() {
        fetch(`http://127.0.0.1:8000/invoices/add-invoice/`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                order_id: selectedTable.order_id
            })
        }).then(() => {
            setFetchOrder(!fetchOrder)
        })
    }


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
                    <div>Date: {orderInfor.date_added ? formatDateTime(orderInfor.date_added) : ""}</div>
                    {invoice && (
                        <div className="text-red">Invoice Created!</div>
                    )}               
                    <div className="mt-[0.7vw] flex">
                        <TableOrderList orderId={orderInfor.order_id}/>
                    </div>
                </div>
            </div>
            <div className="bg-gunmetal fixed bottom-0 w-[27vw] h-[5vw] flex flex-row justify-evenly box-border py-[1vw] font-medium text-[1.2vw]">
                {
                    invoice ? 
                        <button className="bg-red w-[90%] text-white rounded-[0.7vw]" onClick={() => setCheckoutModal(true)}>
                            Check-out
                        </button>
                    :
                        <button className="bg-honeydew w-[90%] rounded-[0.7vw]" onClick={() => {
                            generateInvoiceHandler();
                        }}>
                            Generate Invoice
                        </button>
                }   
            </div> 

            {checkoutModal && (
                <div className="check-out-modal">
                    <div className="w-screen h-screen top-0 left-0 bottom-0 right-0 fixed staff-overlay">
                        <CheckoutConfirmation selectedTable={selectedTable} invoice={invoice} setCheckoutModal={setCheckoutModal} setSelectedTable={setSelectedTable} setFetchTables={setFetchTables}/>
                    </div>
                </div>
            )}     
        </div>
    )
}