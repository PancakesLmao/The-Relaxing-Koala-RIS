import { useEffect, useState } from "react"
import { formatDateTime } from "../../js/staff/Methods"
import ReceiptItemsHistory from "./ReceiptItemHistory"


export default function SingleReceiptHistory({receipt}) {
    const [open, setOpen] = useState(false)
    const [order, setOrder] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/orders/get-order/${receipt.order_id}`).then(
            response => {
                if (response.status === 200) {
                    return response.json()
                }
            }
        ).then(data => {
            setOrder(data)
        })
    }, [receipt.order_id])
    return (
        <div className="bg-antiflash-white w-[100%] flex flex-col border-[0.1vw] border-silver mb-[1.5vw] cursor-pointer"
            onClick={() => setOpen(!open)}>
            <div className="flex justify-between mx-[2vw] py-[1.1vw]">
                <div className="flex gap-[2.5vw] font-light text-[1.5vw] items-center">
                    <p className="w-[2vw]">{receipt.receipt_id}</p>
                    <p className="w-[18vw]">{order && order.name}</p>
                    <p className="w-[18vw]">{formatDateTime(receipt.date_added)}</p>
                    <p className="w-[15vw] text-center">{receipt.payment_method}</p>
                    <p className="w-[15vw] text-center">{receipt.total_after_tax}</p>
                </div>
                <i className={`ri-arrow-down-s-line leading-[1] text-[2.6vw] staff-chevron ${open ? "staff-chevron-open" : ""}`}></i>

            </div>
            {open && (
                <div className="bg-silver flex items-center w-[100%] p-[0.7vw]">
                    <ReceiptItemsHistory order_id={receipt.order_id} receipt={receipt}/>
                </div>
            )}  
        </div>
    )
}