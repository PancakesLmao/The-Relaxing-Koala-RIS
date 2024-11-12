

export default function TableList({tables, setSelectedTable}) {

    return (
        <div className="p-[1.5vw]">
            <h1 className="text-center text-[1.8vw] font-medium text-gunmetal">Select Table</h1>
            <div className="m-auto w-[60%] h-[0.2vw] bg-gunmetal"></div>
            <div className="mt-[2vw] grid grid-cols-2 gap-[1vw]">
                {tables.map((table, index) => (
                    <button key={index} className="py-[0.6vw] bg-gunmetal text-honeydew text-[1.5vw] font-medium"
                        onClick={() => setSelectedTable(table)}>
                        Table {table.table_number}
                    </button>
                ))} 
            </div>
        </div>
    )
}