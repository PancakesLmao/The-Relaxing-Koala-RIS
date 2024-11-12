import { useRef, useState } from "react";
import "../../css/customer/header.css";
import HeaderBehavior from "../../js/customer/header";
import Sidebar from "./sidebar";
import logo from "../../assets/logo.png";

// Header component
export default function Header() {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const linkLogo1 = logo;
  const linkLogo2 = logo;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  HeaderBehavior({ headerRef, logoRef, setIsScrolled, linkLogo1, linkLogo2 });

  return (
    <>
      <header ref={headerRef} className={isScrolled ? "header-fixed" : ""}>
        <div className="wrap-header trans-0-4">
          <div className="container h-full px-7">
            <div className="bg-header flex justify-between items-center w-full h-full">
              {/* Logo */}
              <div className="flex">
                <a href="#">
                  <img
                    ref={logoRef}
                    src={isScrolled ? linkLogo1 : linkLogo1}
                    alt="Logo"
                    className="logo"
                  />
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
