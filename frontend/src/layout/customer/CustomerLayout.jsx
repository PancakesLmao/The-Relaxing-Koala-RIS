import { Outlet } from "react-router-dom";
import Header from "../../components/customer/header";
import Footer from "../../components/customer/footer";

export default function CustomerLayout() {
  return (
    <div>
      <Header />
      {/* <div>Customer Page</div> */}

      {/* Content */}
      <Outlet />

      <Footer />
    </div>
  );
}
