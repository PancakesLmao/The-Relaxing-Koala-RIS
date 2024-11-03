import { Outlet } from "react-router-dom";
import { setCookie, getCookie, deleteCookie } from "../../components/Methods";

export default function StaffLayout() {
    setCookie("name", "Anle", 1);
    
    return (
        <div>
            <div>Staff Page</div>
            <br></br>
            <Outlet />
        </div>
    )
}