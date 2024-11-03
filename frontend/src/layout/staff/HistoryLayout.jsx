import { Outlet } from "react-router-dom";

export default function HistoryLayout() {
    return (
        <div>
            <div>History Page</div>
            <br></br>
            <Outlet />
        </div>
    )
}