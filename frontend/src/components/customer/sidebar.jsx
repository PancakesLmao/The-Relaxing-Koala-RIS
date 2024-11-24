// src/components/Sidebar.js
import { NavLink } from "react-router-dom";
import imageAssets from "../../assets/image-assets.json";

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "#about",
    },
    {
      name: "Menu",
      path: "#menu",
    },
    {
      name: "Contact",
      path: "#contact",
    },
  ];
  return (
    <>
      {/* Overlay */}
      <div
        className={`overlay ${isSidebarOpen ? "show-overlay" : ""}`}
        onClick={toggleSidebar}
      ></div>
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "show-sidebar" : ""}`}>
        <div className="side-button">
          <button
            className="btn-hide-sidebar trans-0-4"
            onClick={toggleSidebar}
          ></button>
        </div>
        <ul className="menu-sidebar">
          {/* Menu */}
          {navItems.map((item, index) => (
            <li key={index} className="text-center mb-5">
              {item.path.startsWith("/") ? (
                <NavLink
                  to={item.path}
                  style={{ fontFamily: "Mireille-Regular" }}
                >
                  {item.name}
                </NavLink>
              ) : (
                <a href={item.path} style={{ fontFamily: "Mireille-Regular" }}>
                  {item.name}
                </a>
              )}
            </li>
          ))}
          <li className="text-center mb-5">
            <NavLink to="/customer/reservation">
              <button
                type="button"
                class="text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#4a614c] dark:hover:bg-[#28472a] dark:focus:ring-[#28472a] trans-0-4"
                style={{ fontFamily: "Mireille-Regular" }}
              >
                Make Reservation
              </button>
            </NavLink>
          </li>
        </ul>

        <div>
          <div>
            <h1 className="text-center text-2xl font-bold p-5">Contact Us</h1>
          </div>
          <ul className="contact-sidebar flex justify-center items-center">
            <li>
              <a href="#">
                <img src={imageAssets.facebookIcon} alt="Facebook" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={imageAssets.twitterIcon} alt="Twitter" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={imageAssets.instagramIcon} alt="Instagram" />
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}