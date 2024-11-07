import TableOrderList from "../../components/staff/TableOrderList";

export default function SingleTable({table}) {

    return (
        <div className="px-[2.5vw] py-[3.5vw] font-medium bg-white text-center">
            <h1 className="text-[1.8vw] ">Table No.{table.table_number}</h1>
            <div className="m-auto h-[0.25vw] w-[60%] bg-gunmetal"></div>
            <h2 className="text-[1.8vw] mt-[2vw]">Order Detail</h2>
            <div className="m-auto h-[0.25vw] w-[100%] bg-gunmetal"></div>
            <div className="mt-[0.7vw] text-[1.3vw] text-left">
                <div>Name:</div>
                <div>Order ID: </div>
                <div>Date: </div>
                <div className="mt-[0.7vw] flex">
                    <TableOrderList />
                </div>
            </div>
        </div>
    )
}