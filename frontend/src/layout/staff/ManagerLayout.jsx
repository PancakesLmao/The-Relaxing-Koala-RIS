import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from "../../js/staff/Methods";
import { useEffect, useState } from "react";
import AccessDenied from "../../pages/AccessDenied";

export default function ManagerLayout() {
    const kick = useNavigate()
    const [isValidate, setValidate] = useState(false)
    useEffect(() => {
        const cookie = getCookie("role")
    
        if (cookie === "admin") {
            setValidate(true)
        }
    }, [kick])
    return (
        isValidate ? 
            <div className="pl-[1vw]">
                <div className="flex pt-[1.2vw] justify-between h-[10vh]">
                    <div className="text-[2.4vw] font-medium pt-[0.6vw]">
                        Manager
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
        :
        <AccessDenied />  
    )
}