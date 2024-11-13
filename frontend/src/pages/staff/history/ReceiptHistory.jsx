import { useEffect, useRef, useState } from "react";
import SingleReceiptHistory from "../../../components/staff/SingleReceiptHistory";


export default function ReceiptHistory() {
    const [selectedOption, setSelectedOption] = useState("name")
    const searchValue = useRef("");
    const [receipts, setReceipts] = useState([])
    const [fetchReceipt, setFetchReceipt] = useState(true)

    useEffect(() => {
        if (fetchReceipt) {
            fetch('http://127.0.0.1:8000/receipts/get-all-receipts').then(
                response => {
                    if (response.status === 200) {
                        return response.json()
                    }
                }
            ).then(data => {
                setReceipts(data)
            })
        }    
    }, [fetchReceipt])

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
                            <input type="radio" name="search-type" value="payment-method" className="w-[1.3vw] h-[1.3vw]" defaultChecked={selectedOption === "V"} onChange={() => setSelectedOption("payment-method")}/>
                            <label htmlFor="payment-method">Payment Method</label>
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
            <div className="flex gap-[2.5vw] font-medium text-[1.5vw] ml-[2vw] py-[0.7vw]">
                <p className="w-[2vw]">ID</p>
                <p className="w-[18vw]">Name</p>
                <p className="w-[18vw]">Date and Time</p>
                <p className="w-[15vw] text-center">Payment Method</p>
                <p className="w-[15vw] text-center">Grand Total</p>
            </div>
            {receipts.map((receipt, index) => (
                <SingleReceiptHistory key={index} receipt={receipt} />
            ))}
        </div>
    )
}