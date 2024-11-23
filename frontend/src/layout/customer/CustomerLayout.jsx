import { Outlet } from "react-router-dom";
// import Header from "../../components/customer/header";
import Footer from "../../components/customer/footer";

function App() {
  return (
    <>
      <CustomerLayout />
    </>
  );
}


export default function CustomerLayout() {
  return (
    <div>
      {/* <div>Customer Page</div> */}
      {/* Content */}
      <Outlet />
      <Footer />
    </div>
  );
}
