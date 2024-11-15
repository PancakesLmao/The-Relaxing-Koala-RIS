import { useEffect, useRef, useState } from "react";
import { formatDateTime } from "../../js/staff/Methods";


export default function SingleTableReserved({selectedTable, setFetchTables, setSelectedTable}) {
    const customerName = useRef("");
    const [errorMsg, setErrorMsg] = useState("");
    const [reservations, setReservations] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/reservations/get-reservations-from-table/${selectedTable.table_number}`).then(
            response => {
                if (response.status === 200) {
                    return response.json()
                }
            }
        ).then(data => {
            console.log(data)
            setReservations(data)
        })
    }, [selectedTable.table_number])

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
            }).catch(() => {
                setErrorMsg("Something went wrong!")             
            })
        } else {
            setErrorMsg("Please enter name!")
        }
    }

    return (
        <div className="px-[2.5vw] py-[3.5vw] font-medium bg-white text-center">                        
            <h1 className="text-[2vw] ">Table No. {selectedTable.table_number}</h1>
            <div className="m-auto h-[0.25vw] w-[60%] bg-gunmetal"></div>
            <div className="w-[100%] mt-[1.5vw]">
                {reservations.map((reserv, index) => (
                    <div key={index} className="w-[100%] mb-[1.5vw] bg-antiflash-white flex items-center justify-between p-[0.7vw] border-[0.1vw] border-silver">
                        <div className="text-left">
                            <h1 className="text-[1.2vw]">{reserv.customer_name}</h1>
                            <p className="font-normal text-[1.1vw]">{formatDateTime(reserv.date_reserved)}</p>
                        </div>
                        <p className="text-[1.1vw]">{reserv.number_of_people} people</p>
                    </div> 
                ))}
                      
            </div>
            <div className="h-[0.25vw] w-[100%] bg-gunmetal"></div>
            <form className="text-left font-medium text-[1.4vw] mt-[1vw]" onSubmit={submitHandler}>
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