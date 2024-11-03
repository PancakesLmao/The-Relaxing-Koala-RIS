import { Outlet } from "react-router-dom";

export default function StaffLayout() {
    return (
        <div>
            <div>Staff Page</div>
            <br></br>
            <Outlet />
        </div>
    )
}