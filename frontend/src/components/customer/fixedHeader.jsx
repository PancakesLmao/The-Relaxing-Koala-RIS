import { useState } from "react";
import { useHeaderBehaviour } from "../../js/customer/headerBehaviour";
import "../../css/customer/koalaHeader.css";
import Sidebar from "./sidebar";
import logo from "../../assets/logo.png";

// Header component
export default function FixedHeader() {
  const { headerRef, logoRef, isScrolled } = useHeaderBehaviour(logo);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <header ref={headerRef} className={"header-fixed"}>
        <div className="wrap-header trans-0-4">
          <div className="container h-full px-7">
            <div className="bg-header flex justify-between items-center w-full h-full">
              {/* Logo */}
              <div className="flex">
                <a href="#">
                  <img ref={logoRef} src={logo} alt="Logo" className="logo" />
                </a>
              </div>
              {/* Menu */}
              <div className="wrap-menu h-full px-5-xl px-0-sm ">
                <nav className="menu flex justify-center items-center h-full">
                  <ul className="main-menu flex justify-center items-center">
                    <li className="trans-0-4">
                      <a href="#">Home</a>
                    </li>
                    <li className="trans-0-4">
                      <a href="#">About</a>
                    </li>
                    <li className="trans-0-4">
                      <a href="#">Menu</a>
                    </li>
                    <li className="trans-0-4">
                      <a href="#">Reservation</a>
                    </li>
                    <li className="trans-0-4">
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* Sidebar button */}
              <div className="side-button">
                <button
                  onClick={toggleSidebar}
                  className="btn-show-sidebar trans-0-4"
                ></button>
              </div>
              {/* End of Header */}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}
