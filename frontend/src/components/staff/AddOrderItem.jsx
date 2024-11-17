import { useRef, useState } from "react";
import { useNewOrderContext } from "../../context/staff/NewOrderContext"


export default function AddOrderItem({selectedMenuItem, setAddItemModal}) {
    const [quantity, setQuantity] = useState(1);
    const notes = useRef("");
    const {addOrder} = useNewOrderContext();

    function handleAddOrder(event) {
        const newOrderItem = {
            menu_item: selectedMenuItem.item,
            quantity: quantity,
            notes: notes.current.value
        }

        addOrder(newOrderItem)
        setAddItemModal(false)
    }

    return (
        <div className="bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
        w-[50vw] overflow-auto box-border">
            <div className="flex flex-col p-[1vw] gap-[1.2vw]">
                <div className="flex bg-green gap-[1vw]">
                    <div className="w-[35%] aspect-square border-[0.2vw] border-gunmetal">
                        <img src={require(`../../assets/${selectedMenuItem.item.image_name}.jpg`)} alt="pic"/>
                    </div>
                    <div className="flex-1 relative">
                        <i className="ri-close-line absolute top-0 right-0 leading-[1] bg-gunmetal text-white text-[2.5vw] cursor-pointer" onClick={() => setAddItemModal(false)}></i>
                        <p className="font-medium text-[2.1vw]">{selectedMenuItem.index + 1}. {selectedMenuItem.item.item_name}</p>
                        <p className="font-light text-[1.5vw]">Price: {selectedMenuItem.item.price} A$</p>
                        <div className="absolute bottom-0 right-0 flex items-center gap-[1.8vw]">
                            <i className="ri-subtract-line leading-[1] text-gunmetal border-[0.1vw] border-gunmetal text-[2.5vw] cursor-pointer"
                                onClick={() => {
                                    if (quantity > 1) {
                                        setQuantity(quantity - 1)
                                    }
                                }}></i>
                            <p className="text-[2.5vw] leading-[1] ">{quantity}</p>
                            <i className="ri-add-line leading-[1] text-white bg-gunmetal text-[2.5vw] cursor-pointer"
                                onClick={() => setQuantity(quantity + 1)}></i>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <label htmlFor="notes"className="text-gunmetal font-medium text-[1.7vw]">Notes:</label>
                    <input type="text" id="notes" name="notes" placeholder="Notes to Kitchen..." ref={notes} className="border-[0.1vw] border-gunmetal h-[2vw] px-[0.1vw] py-[1.3vw]"></input>
                    <div className="bg-gunmetal w-[100%] h-[0.2vw] mt-[3.5vw]"></div>
                    <button className="bg-gunmetal text-honeydew font-medium py-[0.7vw] mt-[1vw]" onClick={() => handleAddOrder()}>
                        Add to Order
                    </button>
                </div>
            </div>
        </div>
    )
}