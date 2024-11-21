import { NavLink, Outlet, useLocation } from "react-router-dom";
import { getCookie } from "../../js/staff/Methods";


export default function HistoryLayout() {
    const location = useLocation().pathname.split('/').reverse()[0]

    return (
        <div className="px-[1vw]">
            <div className="flex pt-[1.2vw] justify-between h-[10vh]">
                <div className="flex items-center pt-[0.6vw] gap-[1.5vw]">
                    {location === "order-history" ? 
                        <p className="text-[2.4vw] font-medium">Order History</p>
                    :
                        <p className="text-[2.4vw] font-medium">Receipt History</p>}  
                    <NavLink to="./order-history" className="text-center staff-history-navitems">
                        <button className="text-[1.4vw] font-medium bg-honeydew py-[0.2vw] w-[8vw] rounded-[0.6vw]">
                            Order
                        </button>
                    </NavLink>
                    <NavLink to="./receipt-history" className="text-center staff-history-navitems">
                        <button className="text-[1.4vw] font-medium bg-honeydew py-[0.2vw] w-[8vw] rounded-[0.6vw]">
                            Receipt
                        </button>
                    </NavLink>
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
            <Outlet />
                    
        </div>
    )
}