import { Outlet } from "react-router-dom";
import Header from "../../components/customer/header"
import Sidebar from "../../components/customer/sidebar"

export default function CustomerLayout() {
    return (
        <div>
            <Header />
            {/* <div>Customer Page</div> */}
            <Outlet />
        </div>
    )
}