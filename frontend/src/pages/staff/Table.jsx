import { useEffect, useState } from "react"
import SingleTableUnoccupied from "../../components/staff/SingleTableUnoccupied";
import SingleTableOccupied from "../../components/staff/SingleTableOccupied";
import TableSvg from "../../assets/table.svg";
import OccupiedTableSvg from "../../assets/table-occupied.svg";

export default function Table() {
    const [tables, setTables] = useState([]);
    const [fetchTables, setFetchTables] = useState(true);
    const [selectedTable, setSelectedTable] = useState(null);

    useEffect(() => {
        if (fetchTables) {
            fetch("http://127.0.0.1:8000/tables/get-tables").then(
                response => {
                    if (response.ok) {
                        return response.json()
                    }

                    return Promise.reject()
                }
            ).then((data) => {
                setTables(data)
                
            }).catch((response) => {
                response.json().then((data) => {
                    console.error(data);
                })
            }).finally(
                setFetchTables(false)
            )
        }
    }, [fetchTables, setFetchTables])
    

    return (
        <div className="pl-[1vw]">
            <div className="flex pt-[1.2vw] justify-between h-[10vh]">
                <div className="text-[2.4vw] font-medium pt-[0.6vw]">
                    Table Management
                </div>
                <i className="material-symbols-outlined text-[4vw] act-circ">account_circle</i>
            </div>
            <div className="h-[0.2vw] w-[100%] bg-gunmetal"></div>
            <div className="flex">
                <div className="flex-1 h-[90vh] overflow-y-auto grid grid-cols-4 auto-rows-[15vw]">
                    {tables.map((table, index) => (
                        <div key={index} className="m-auto relative">
                            {                             
                                (() => {
                                    if (table.table_status === "UNOCCUPIED") {
                                        return (
                                            <div className={`cursor-pointer ${selectedTable !== null ? selectedTable.table_number === table.table_number ? "border-[0.2vw] border-solid border-gunmetal" : "" : ""}`} onClick={() => setSelectedTable(table)}>
                                                <img src={TableSvg} alt="table" className="rotate-90 w-[11vw] h-[11vw]"></img>
                                                <div className="absolute font-medium text-[1.3vw] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                                    <p>Table {table.table_number}</p>
                                                    <p>{table.table_capacity} Seats</p>
                                                </div>
                                            </div>
                                        )
                                    } else if (table.table_status === "OCCUPIED") {
                                        return (
                                            <div className={`cursor-pointer ${selectedTable !== null ? selectedTable.table_number === table.table_number ? "border-[0.2vw] border-solid border-gunmetal" : "" : ""}`} onClick={() => setSelectedTable(table)}>
                                                <img src={OccupiedTableSvg} alt="table" className="rotate-90 w-[11vw] h-[11vw]" onClick={() => setSelectedTable(table)}></img>
                                                <div className="absolute font-medium text-honeydew text-[1.3vw] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                                    <p>Table {table.table_number}</p>
                                                    <p>{table.table_capacity} Seats</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })()                           
                            }
                        </div>
                    ))}

                </div>

                <div className="w-[27vw] h-[90vh] overflow-y-auto box-border border-l-[0.2vw] border-solid border-gunmetal">
                    {
                        (() => {
                            if (selectedTable == null) {
                                return
                            }

                            if (selectedTable.table_status === "UNOCCUPIED") {
                                return <SingleTableUnoccupied selectedTable={selectedTable} setFetchTables={setFetchTables} setSelectedTable={setSelectedTable}/>
                            }
                            
                            if (selectedTable.table_status === "OCCUPIED") {
                                return (
                                    <SingleTableOccupied selectedTable={selectedTable} setSelectedTable={setSelectedTable}/>
                                ) 
                            }
                        })()
                    }
                                
                </div>                
            </div>         
        </div>
    )
}