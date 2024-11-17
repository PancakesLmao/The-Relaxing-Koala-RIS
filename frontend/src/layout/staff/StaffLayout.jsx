import "../../css/staff/staff.css"
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "../../components/staff/Navbar";
import { useEffect } from "react";
import { getCookie } from "../../js/staff/Methods";


export default function StaffLayout() {
    const kick = useNavigate()
    useEffect(() => {
        const cookie = getCookie("name")
    
        if (!cookie) {
            kick("../staff-login")
        }
    }, [kick])
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