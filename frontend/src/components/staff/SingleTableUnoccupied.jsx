import { useRef, useState } from "react";


export default function SingleTable({selectedTable, setFetchTables, setSelectedTable}) {
    const customerName = useRef("");
    const [errorMsg, setErrorMsg] = useState("");

    function submitHandler(event) {
        event.preventDefault();

        if (customerName.current.value.trim() !== "") {
            const newOrder = {
                table_number: `${selectedTable.table_number}`,
                customer_name: customerName.current.value
            }

            fetch("http://127.0.0.1:8000/tables/add-order", {
                method: "PATCH",
                body: JSON.stringify(newOrder),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {             
                if (response.status === 204) {
                    setSelectedTable(null)
                    setFetchTables(true)
                    return
                }

                return Promise.reject()
            }).catch((response) => {
                response.json().then((data) => {
                    console.error(data)
                    setErrorMsg("Something went wrong!")
                })
            })
        } else {
            setErrorMsg("Please enter name!")
        }
    }

    return (
        <div className="px-[2.5vw] py-[3.5vw] font-medium bg-white text-center">                        
            <h1 className="text-[2vw] ">Table No. {selectedTable.table_number}</h1>
            <div className="m-auto h-[0.25vw] w-[60%] bg-gunmetal"></div>
            <form className="text-left font-medium text-[1.4vw] mt-[1.5vw]" onSubmit={submitHandler}>
                <label htmlFor="cname">Customer's Name:</label>
                <input className="w-[100%] border-[0.1vw] border-solid border-gunmetal p-[0.25vw] font-normal" type="text" id="cname" name="cname" placeholder="Name" ref={customerName}></input>
                {(errorMsg !== "") && (
                    <div className="text-red font-normal mt-[0.2vw]">
                        {errorMsg}
                    </div>
                )}
                <div className="mt-[8vw] h-[0.25vw] w-[100%] bg-gunmetal"></div>
                <button className="mt-[0.7vw] w-[100%] h-[3vw] text-[1.3vw] bg-gunmetal text-honeydew">Assign Table</button>
            </form>             
        </div> 
    )
}