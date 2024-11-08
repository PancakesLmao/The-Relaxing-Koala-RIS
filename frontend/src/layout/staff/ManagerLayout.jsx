import { Outlet } from "react-router-dom";

export default function ManagerLayout() {
    return (
        <div className="pl-[1vw]">
            <div className="flex pt-[1.2vw] justify-between h-[10vh]">
                <div className="text-[2.4vw] font-medium pt-[0.6vw]">
                    Manager
                </div>
                <i className="material-symbols-outlined text-[4vw] act-circ">account_circle</i>
            </div>
            <div className="h-[0.2vw] w-[100%] bg-gunmetal"></div>
            <Outlet />
                    
        </div>
    )
}