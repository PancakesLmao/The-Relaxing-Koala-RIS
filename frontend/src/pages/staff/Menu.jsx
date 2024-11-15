import { useEffect, useState } from "react";
import DisplayMenu from "../../components/staff/DisplayMenu";
import SingleTableOrder from "../../components/staff/SingleTableOrder";
import NewOrdersContextProvider from "../../context/staff/NewOrderContext";
import TableList from "../../components/staff/TableList";


export default function Menu() {
    const [tables, setTables] = useState([])
    const [selectedTable, setSelectedTable] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:8000/tables/get-tables').then(
            response => {
                if (response.status === 200) {
                    return response.json()
                }
                
                return Promise.reject()
            }
        ).then(data => {
            setTables(data)
        }).catch(response =>
            response.json().then(data => console.error(data))
        )
    }, [])

    return (
        <div className="pl-[1vw]">
            <div className="flex pt-[1.2vw] justify-between h-[10vh]">
                <div className="text-[2.4vw] font-medium pt-[0.6vw]">
                    Menu/Order
                </div>
                <i className="material-symbols-outlined text-[4vw] act-circ">account_circle</i>
            </div>
            <div className="h-[0.2vw] w-[100%] bg-gunmetal"></div>
            <div className="flex">
                <NewOrdersContextProvider>
                    <div className="flex-1 h-[90vh] overflow-y-auto">
                        <DisplayMenu selectedTable={selectedTable}/>
                    </div>                   
                    <div className="w-[27vw] h-[90vh] overflow-y-auto box-border border-l-[0.2vw] border-solid border-gunmetal">
                        {
                            (() => {
                                if (!tables) {
                                    return (
                                        <></>
                                    )
                                }

                                if (!selectedTable) {
                                    return (
                                        <TableList tables={tables} setSelectedTable={setSelectedTable} />
                                    )
                                } else {
                                    return (
                                        <SingleTableOrder selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
                                    )
                                    
                                }
                            })()
                        }        
                    </div>
                </NewOrdersContextProvider>
                                   
            </div>         
        </div>
    )
}