import { Outlet } from "react-router-dom";

export default function ManagerLayout() {
    return (
        <div>
            <div>Manager Page</div>
            <br></br>
            <Outlet />
        </div>
    )
}