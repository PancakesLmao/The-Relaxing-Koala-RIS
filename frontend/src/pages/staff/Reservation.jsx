import { useEffect, useRef, useState } from "react"

export default function Reservation() {
    const [selectedOption, setSelectedOption] = useState("name");
    const [reservations, setReservations] = useState([]);
    const [fetchReserv, setFetchReserv] = useState(true);
    const searchValue = useRef("");

    useEffect(() => {
        if (fetchReserv) {
            fetch("http://127.0.0.1:8000/reservations/get-all-reservations").then(
                response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                }
            ).then(data => {
                setReservations(data)
            }).finally(() => {
                setFetchReserv(false)
            })
        }
    }, [fetchReserv])

    function searchReservation(event) {
        event.preventDefault()
        if (!searchValue.current.value || searchValue.current.value === ".") {
            setFetchReserv(true)
            return
        }

        let encodedURI = `http://127.0.0.1:8000/reservations/get-reservations-from-${selectedOption}/` + encodeURIComponent(searchValue.current.value)
        console.log(encodedURI)
        fetch(encodedURI).then(
            response => {
                if (response.status === 200) {
                    return response.json()
                }

                return Response.reject()
            }
        ).then(data => {
            setReservations(data)
        }).catch(() => {
            setReservations([])
        })
    }

    function deleteReservation(reservation) {
        fetch(`http://127.0.0.1:8000/reservations/remove-reservation/${reservation.reservation_id}`, {
            method: 'DELETE'
        }).then(
            response => {
                if (response.status === 200) {
                    setFetchReserv(true)
                }

                return Promise.reject()
            }
        ).catch((response) => {
            console.log(response)
            setFetchReserv(true)
        })
    }

    function checkInReservation(reservation) {
        console.log({
            table_number: reservation.table_number,
            customer_name: reservation.customer_name
        })
        fetch("http://127.0.0.1:8000/tables/add-order", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table_number: `${reservation.table_number}`,
                customer_name: reservation.customer_name
            })
        }).then(
            response => {
                if (response.status === 204) {
                    deleteReservation(reservation)
                    return
                }

                return Promise.reject()
            }
        ).catch(() => {
            setFetchReserv(true)
        })
    }

    return (
        <div className="px-[1vw]">
            <div className="flex pt-[1.2vw] justify-between h-[10vh]">
                <div className="text-[2.4vw] font-medium pt-[0.6vw]">
                    Reservation
                </div>
                <i className="material-symbols-outlined text-[4vw] act-circ">account_circle</i>
            </div>
            <div className="h-[0.2vw] w-[100%] bg-gunmetal"></div>
            <form onSubmit={(event) => searchReservation(event)}>
                <div className="flex font-medium items-center gap-[5vw] py-[0.6vw]">
                    <p className="text-[1.8vw]">Search By:</p>
                    <div className="flex gap-[5vw] text-[1.7vw]">
                        <div className="flex items-center gap-[0.3vw]">
                            <input type="radio" name="search-type" value="name" className="w-[1.3vw] h-[1.3vw]" defaultChecked={selectedOption === "name"} onChange={() => setSelectedOption("name")}/>
                            <label htmlFor="name">Customer's Name</label>
                        </div>
                        <div className="flex items-center gap-[0.3vw]">
                            <input type="radio" name="search-type" value="phone" className="w-[1.3vw] h-[1.3vw]" defaultChecked={selectedOption === "phone"} onChange={() => setSelectedOption("phone")}/>
                            <label htmlFor="phone">Phone Number</label>
                        </div>
                        <div className="flex items-center gap-[0.3vw]">
                            <input type="radio" name="search-type" value="table" className="w-[1.3vw] h-[1.3vw]" defaultChecked={selectedOption === "table"} onChange={() => setSelectedOption("table")}/>
                            <label htmlFor="table">Table</label>
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
                <p className="w-[9vw]">Phone</p>
                <p className="w-[6vw] text-center">People</p>
                <p className="w-[15vw]">Date and Time</p>
                <p className="w-[4vw] text-center">Table</p>
            </div>
            {reservations.map((reservation, index) => (
                <div key={index} className="bg-antiflash-white w-[100%] flex flex-col border-[0.1vw] border-silver mb-[1.5vw]">
                    <div className="flex justify-between mx-[2vw] py-[1.1vw]">
                        <div className="flex gap-[2.5vw] font-light text-[1.5vw] items-center">
                            <p className="w-[2vw]">{reservation.reservation_id}</p>
                            <p className="w-[18vw]">{reservation.customer_name}</p>
                            <p className="w-[9vw]">{reservation.customer_phone}</p>
                            <p className="w-[6vw] text-center">{reservation.number_of_people}</p>
                            <p className="w-[15vw]">{reservation.date_reserved}</p>
                            <p className="w-[4vw] text-center">{reservation.table_number}</p>
                        </div>
                        <div className="flex items-center gap-[2.5vw]">
                            <i className="ri-close-line leading-[1] text-[2.5vw] p-[0.2vw] bg-red text-white rounded-[0.5vw] cursor-pointer"
                                onClick={() => deleteReservation(reservation)}></i>
                            <i className="ri-check-line leading-[1] text-[2.5vw] p-[0.2vw] bg-lime-green text-white rounded-[0.5vw] cursor-pointer" 
                                onClick={() => checkInReservation(reservation)}></i>
                        </div>            
                    </div>
                    <div className="bg-silver flex items-center w-[100%] h-[3vw]">
                        <p className="ml-[2vw] font-light text-[1.5vw]">Notes: {reservation.notes}</p>
                    </div>
                </div>
            ))}               
        </div>
    )
}