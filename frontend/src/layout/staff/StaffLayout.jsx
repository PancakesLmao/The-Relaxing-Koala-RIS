import "../../css/staff/staff.css"
import { Outlet } from "react-router-dom";
import { setCookie, getCookie, deleteCookie } from "../../js/staff/Methods.js";
import Navbar from "../../components/staff/Navbar";

export default function StaffLayout() {
    setCookie("name", "Anle", 1);
    
    return (
        <div className="flex flex-row">
            <div className="fixed h-[100vh] w-[5.5vw] bg-gunmetal">
                <Navbar />
            </div>
            
            <div className="ml-[5.5vw] w-[94.5vw]">
                <Outlet />
            </div>
        </div>
    )
}