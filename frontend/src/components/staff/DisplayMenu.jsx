import { useEffect, useRef, useState } from "react"
import AddOrderItem from "./AddOrderItem"


export default function DisplayMenu() {
    const [menuItems, setMenuItems] = useState([])
    const [addItemModal, setAddItemModal] = useState(false)
    const selectedMenuItem = useRef({});

    useEffect(() => {
        fetch("http://127.0.0.1:8000/menus/get-menu-items").then(
            response => {
                if (response.status === 200) {
                    return response.json()
                }

                return Promise.reject()
            }
        ).then((data) => {
            setMenuItems(data)
            console.log(data)
        }).catch((response) => {
            console.error(response)
        }) 
    }, [])
    return (
        <div className="grid grid-cols-3 gap-[0.7vw] my-[1vw] mr-[1vw]">
            {menuItems.map((item, index) => {
                return (
                    <div key={index} className="bg-antiflash-white border-[0.15vw] border-silver h-[11vw] p-[0.5vw] box-border flex cursor-pointer"
                    onClick={() => {
                        selectedMenuItem.current.value = {index, item}
                        setAddItemModal(true);

                    }}>
                        <div className="aspect-square h-full">
                            <img src={require(`../../assets/${item.image_name}.jpg`)} alt="abc" className="border-[0.1vw] border-silver h-full w-full object-contain"/>
                        </div>
                        <div className="flex-1 ml-[0.5vw] relative">
                            <p className="font-medium text-[1.1vw]">{index + 1}. {item.item_name}</p>
                            <p className="text-[1vw]">Price: {item.price} A$</p>
                            <i className="ri-add-line absolute bottom-0 right-0 leading-[1] text-[2vw] text-white bg-gunmetal"></i>
                        </div>         
                    </div>
                )
            })}
            {addItemModal && (
                <div className="fixed w-screen h-screen top-0 left-0 bottom-0 right-0 staff-overlay z-10">
                    <AddOrderItem selectedMenuItem={selectedMenuItem.current.value} setAddItemModal={setAddItemModal}/>
                </div>
            )}
            
        </div>
    )
}