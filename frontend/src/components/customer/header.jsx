import { useState } from "react";
import {NavLink} from "react-router-dom";
import { useHeaderBehaviour } from "../../js/customer/headerBehaviour";
import "../../css/customer/koalaHeader.css";
import Sidebar from "./sidebar";
import logo from "../../assets/logo.png";

// Header component
export default function Header() {
  const { headerRef, logoRef, isScrolled } = useHeaderBehaviour(logo);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const navItems = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "About",
      path: "about"
    },
    {
      name: "Menu",
      path: "menu"
    },
    {
      name: "Reservation",
      path: "reservation"
    },
    {
      name: "Contact",
      path: "#contact"
    }
  ]

  return (
    <>
      <header ref={headerRef} className={isScrolled ? "header-fixed" : ""}>
        <div className="wrap-header trans-0-4">
          <div className="container h-full px-7">
            <div className="bg-header flex justify-between items-center w-full h-full">
              {/* Logo */}
              <div className="flex">
                <NavLink to="/">
                  <img ref={logoRef} src={logo} alt="Logo" className="logo" />
                </NavLink>
              </div>
              {/* Menu */}
              <div className="wrap-menu h-full px-5-xl px-0-sm ">
                <nav className="menu flex justify-center items-center h-full">
                  <ul className="main-menu flex justify-center items-center">
                    {navItems.map((item, index) => (
                      <li key={index} className="trans-0-4">
                        {item.path.startsWith("/") ? (
                          <NavLink to={item.path}>{item.name}</NavLink>
                        ) : (
                          <a href={item.path}>{item.name}</a>
                        )}
                      </li>
                    ))}
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
