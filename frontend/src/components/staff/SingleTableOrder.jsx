import MenuOrderList from "./MenuOrderList";
import NewOrderItems from "./NewOrderItems";


export default function SingleTableOrder() {
    return (
        <div className="relative text-center font-medium">
            <div className="p-[2vw]">
                <i class="ri-arrow-left-line text-gunmetal text-[3vw] absolute top-0 left-0 leading-[1]"></i>
                <h1 className="text-[2vw]">Table No. </h1>
                <div className="m-auto h-[0.25vw] w-[60%] bg-gunmetal"></div>
                <h2 className="text-[1.7vw] mt-[2vw]">Order Detail</h2>
                <div className="m-auto h-[0.25vw] w-[100%] bg-gunmetal"></div>
                <div className="mt-[0.7vw] text-[1.3vw] text-left">
                    <div>Order ID: </div>
                    <div>Name: </div>
                    <div>Date: </div>
                </div>
                <div className="my-[1vw]">
                    <MenuOrderList />
                </div>
                <div className="m-auto h-[0.25vw] w-[100%] bg-gunmetal"></div>
                <h2 className="text-[1.7vw] mt-[0.5vw]">Newly Added</h2>
                <div className="my-[1vw]">
                    <NewOrderItems />
                </div>
            </div>
            <div className="bg-gunmetal fixed bottom-0 w-[27vw] h-[5vw] flex flex-row justify-evenly box-border py-[1vw] font-medium text-[1.2vw]">
                <button className="bg-honeydew w-[90%] text-gunmetal rounded-[0.7vw]">
                    Submit
                </button> 
            </div> 
        </div>
    )
}