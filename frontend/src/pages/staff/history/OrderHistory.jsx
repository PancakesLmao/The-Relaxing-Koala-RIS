import { useEffect, useRef, useState } from "react"
import SingleOrderHistory from "../../../components/staff/SingleOrderHistory";

export default function OrderHistory() {
    const [selectedOption, setSelectedOption] = useState("name")
    const searchValue = useRef("");
    const [orders, setOrders] = useState([])
    const [fetchOrder, setFetchOrder] = useState(true)

    useEffect(() => {
        if (fetchOrder) {
            fetch("http://127.0.0.1:8000/orders/get-all-orders").then(
                response => {
                    if (response.status === 200) {
                        return response.json()
                    }
                }
            ).then(data => {
                setOrders(data)
            }).catch(() => {
                setOrders([])
            }).finally(() => {
                setFetchOrder(false)
            })
        }
    }, [fetchOrder])

    return (
        <div>
            <form>
                <div className="flex font-medium items-center gap-[5vw] py-[0.6vw]">
                    <p className="text-[1.8vw]">Search By:</p>
                    <div className="flex gap-[5vw] text-[1.7vw]">
                        <div className="flex items-center gap-[0.3vw]">
                            <input type="radio" name="search-type" value="name" className="w-[1.3vw] h-[1.3vw]" defaultChecked={selectedOption === "name"} onChange={() => setSelectedOption("name")}/>
                            <label htmlFor="name">Customer's Name</label>
                        </div>
                        <div className="flex items-center gap-[0.3vw]">
                            <input type="radio" name="search-type" value="date" className="w-[1.3vw] h-[1.3vw]" defaultChecked={selectedOption === "date"} onChange={() => setSelectedOption("date")}/>
                            <label htmlFor="date">Date (YYYY-MM-DD)</label>
                        </div>
                        <div className="flex items-center gap-[0.3vw]">
                            <input type="radio" name="search-type" value="type" className="w-[1.3vw] h-[1.3vw]" defaultChecked={selectedOption === "type"} onChange={() => setSelectedOption("type")}/>
                            <label htmlFor="type">Type</label>
                        </div> 
                        <div className="flex items-center gap-[0.3vw]">
                            <input type="radio" name="search-type" value="status" className="w-[1.3vw] h-[1.3vw]" defaultChecked={selectedOption === "status"} onChange={() => setSelectedOption("status")}/>
                            <label htmlFor="status">Status</label>
                        </div>                       
                    </div>
                </div>
                <div className="flex items-stretch gap-[1vw]">
                    <input type="text" id="search-value" name="search-value" placeholder="Search..." ref={searchValue} className="flex-1 border-[0.1vw] border-gunmetal pl-[0.5vw] text-[1.3vw]"></input>
                    <button className="w-[5vw] bg-gunmetal">
                        <i className="ri-search-line text-honeydew text-[1.7vw]"></i>
                    </button>
                </div>
            </form>
            <div className="w-[100%] h-[0.15vw] bg-gunmetal mt-[2vw]"></div>
            <div className="flex gap-[4vw] font-medium text-[1.5vw] ml-[2vw] py-[0.7vw]">
                <p className="w-[2vw]">ID</p>
                <p className="w-[7vw] text-center">Type</p>
                <p className="w-[18vw]">Name</p>
                <p className="w-[18vw]">Date and Time</p>
                <p className="w-[10vw] text-center">Status</p>
            </div>
            {orders.map((order, index) => (
                <SingleOrderHistory key={index} order={order} />
            ))}
        </div>
    )
}