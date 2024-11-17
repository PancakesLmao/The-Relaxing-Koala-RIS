import { useState } from "react"
import { formatDateTime } from "../../js/staff/Methods"
import OrderItemsHistory from "./OrderItemsHistory"
import OnlineItems from "./OnlineItems"


export default function SingleOnlineOrder({order}) {
    const [open, setOpen] = useState(false)
    return (
        <div className="bg-antiflash-white w-[100%] flex flex-col border-[0.1vw] border-silver mb-[1.5vw] cursor-pointer"
            onClick={() => setOpen(!open)}>
            <div className="flex justify-between mx-[2vw] py-[1.1vw]">
                <div className="flex gap-[4vw] font-light text-[1.5vw] items-center">
                    <p className="w-[2vw]">{order.order_id}</p>
                    <p className="w-[7vw] text-center">{order.order_type}</p>
                    <p className="w-[18vw]">{order.name}</p>
                    <p className="w-[18vw]">{formatDateTime(order.date_added)}</p>
                    <p className="w-[14vw]">123456789</p>
                </div>
                <i className={`ri-arrow-down-s-line leading-[1] text-[2.6vw] staff-chevron ${open ? "staff-chevron-open" : ""}`}></i>
            </div>
            {open && (
                <div className="bg-silver flex items-center w-[100%] p-[0.7vw]">
                    <OnlineItems order={order}/>

                </div>
            )}  
        </div>
    )
}