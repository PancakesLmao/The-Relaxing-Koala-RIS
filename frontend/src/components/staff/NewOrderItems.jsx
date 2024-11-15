import { useState } from "react";
import { useNewOrderContext } from "../../context/staff/NewOrderContext";
import EditOrderItem from "./EditOrderItem";


export default function NewOrderItems() {
    const [editItem, setEditItem] = useState(null);
    const {newOrders, deleteItem} = useNewOrderContext();
    
    return (
        <div className="border-box w-[100%] flex flex-col gap-[1vw] mt-[1vw]">
            {newOrders.map((item, index) => (
                <div key={index} className="bg-antiflash-white flex gap-[1.5vw] items-center py-[1vw] px-[1.2vw]">
                    <div className="flex-1">
                        <div className="text-left">
                            <p className="text-[1.3vw]">{index + 1}. {item.menu_item.item_name} x{item.quantity}</p>
                            <p className="font-normal text-[1.1vw]">Price: {Number((item.menu_item.price * item.quantity).toFixed(2))} A$</p>
                            {item.notes && (
                                <p className="font-light text-[1vw]">Note: {item.notes}</p>
                            )}
                        </div>
                    </div>
                    <div className="w-auto h-[2.8vw] flex items-center gap-[1.7vw]">
                        <i className="ri-edit-line leading-[1] text-[1.7vw] text-white bg-argentinian-blue box-border p-[0.4vw] rounded-[0.5vw] cursor-pointer"
                            onClick={() => {
                                setEditItem({
                                    item: item,
                                    index: index
                                })
                            }}></i>
                        <i className="ri-close-line leading-[1] text-[2.3vw] text-white bg-red box-border p-[0.1vw] rounded-[0.5vw] cursor-pointer"
                            onClick={() => deleteItem(item)}></i>               
                    </div>
                </div>
            ))}
            {editItem && (
                <div className="fixed w-screen h-screen top-0 left-0 bottom-0 right-0 staff-overlay z-10">
                    <EditOrderItem editItem={editItem} setEditItem={setEditItem} />
                </div>       
            )}
        </div>
    )
}