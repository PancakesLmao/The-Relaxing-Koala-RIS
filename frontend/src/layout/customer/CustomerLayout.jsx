import { Outlet } from "react-router-dom";

export default function CustomerLayout() {
    return (
        <div>
            <div>Customer Page</div>
            <br></br>
            <Outlet />
        </div>
    )
}