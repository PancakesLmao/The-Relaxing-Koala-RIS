import { useEffect, useState } from "react"


export default function OrderQueueItem({order, setFetchOrder}) {
    const [orderItems, setOrderItems] = useState()

    // useEffect(() => {
    //     fetch(`http:127.0.0.1:8000/orders/get-pending-order-items`)
    // })
    return (
        <div className="w-[23vw] shrink-0 h-fit bg-antiflash-white border-[0.1vw] border-silver p-[1vw]">
            <h1 className="font-medium text-[1.6vw]">Order ID. {order.order_id}</h1>
            <div className="w-[100%] h-[0.1vw] bg-gunmetal"></div>
            <p className="mt-[0.2vw] text-[1.2vw]">Type: {order.order_type}</p>
            <div className="flex flex-col gap-[0.5vw] mt-[0.5vw]">
                <div className="flex gap-[0.5vw] items-stretch">
                    <div className="bg-white border-[0.1vw] border-silver flex-1 p-[0.5vw] font-light flex justify-between items-center">
                        <div className="">
                            <p className="text-[1.1vw] font-normal">1. Dish Name 1</p>
                            <p className="text-[0.9vw]">Note: No Spicy</p>
                        </div>
                        <p className="mr-[0.3vw]">x1</p>
                    </div>
                    <div className="bg-lime-green flex items-center">
                        <i className="ri-check-line leading-[1] text-[2.5vw] text-white"></i>
                    </div>     
                </div>
                <div className="flex gap-[0.5vw] items-stretch">
                    <div className="bg-white border-[0.1vw] border-silver flex-1 p-[0.5vw] font-light flex justify-between items-center">
                        <div className="">
                            <p className="text-[1.1vw] font-normal">1. Dish Name 1</p>
                            <p className="text-[0.9vw]">Note: No Spicy</p>
                        </div>
                        <p className="mr-[0.3vw]">x1</p>
                    </div>
                    <div className="bg-lime-green flex items-center">
                        <i className="ri-check-line leading-[1] text-[2.5vw] text-white"></i>
                    </div>
                    
                </div>
                

                
            </div>
            
        </div>
    )
}