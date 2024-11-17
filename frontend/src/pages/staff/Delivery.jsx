import { getCookie } from "../../js/staff/Methods";


export default function Delivery() {
 
    return (
        <div className="pl-[1vw]">
            <div className="flex pt-[1.2vw] justify-between h-[10vh]">
                <div className="text-[2.4vw] font-medium pt-[0.6vw]">
                    Delivery Order Management
                </div>
                <div className="flex gap-[1vw] items-center">
                    <div className="flex flex-col font-medium text-right text-[1.2vw]">
                        <p>{getCookie("name")}</p>
                        <p>{getCookie("role")}</p>
                    </div>
                    <i className="material-symbols-outlined text-[4vw] act-circ">account_circle</i>
                </div> 
            </div>
            <div className="h-[0.2vw] w-[100%] bg-gunmetal"></div>                    
        </div>
    )
}