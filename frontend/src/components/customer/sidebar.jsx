// src/components/Sidebar.js
import imageAssets from "../../assets/image-assets.json";

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
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
          <li className="text-center mb-5">
            <a href="#">Home</a>
          </li>
          <li className="text-center mb-5">
            <a href="#">About</a>
          </li>
          <li className="text-center mb-5">
            <a href="#">Menu</a>
          </li>
          <li className="text-center mb-5">
            <a href="#">Contact</a>
          </li>
          <li className="text-center mb-5">
            <a>
              <button
                type="button"
                class="text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Make Reservation
              </button>
            </a>
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