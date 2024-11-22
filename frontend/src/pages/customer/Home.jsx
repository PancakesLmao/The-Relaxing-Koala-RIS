import "../../css/customer/koalaHome.css";
import { NavLink } from "react-router-dom";
import assets from "../../assets/image-assets.json";
import Header from "../../components/customer/header";
//
export default function Home() {
  return (
    <>
      <Header />
      <div className="video-container relative">
        <div className="overlay2"></div>
        <div className="relative video-bg blur-sm">
          <video
            autoPlay
            muted
            loop
            src={assets.homeVideo}
            className="object-cover"
          ></video>
        </div>
      </div>
      <div className="content h-[80vh]">
        {/* About us */}
        <div className="grid grid-cols-2 gap-4 min-h-full">
          <div className="flex justify-center items-center">
            <div className="px-24 py-6">
              <h1
                className="font-semibold text-gray-900 uppercase text-stone-400 text-2xl"
                style={{ fontFamily: "Mireille-Light" }}
              >
                WELCOME TO OUR RESTAURANT
              </h1>
              <h1
                className="font-semibold text-gray-900 uppercase text-dark text-4xl pt-3"
                style={{ fontFamily: "Mireille-Bold" }}
              >
                ABOUT US
              </h1>
              <hr className="h-px mb-8 mt-1 bg-gray-200 border-0 dark:bg-gray-700 w-[125px]" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                malesuada, dolor nec porttitor volutpat, nunc metus ultrices
                libero, nec tincidunt libero turpis vel nunc. Nullam nec
                pellentesque neque. Sed nec nunc nec dui ultricies lacinia.
              </p>
              <div className="flex justify-end pt-3">
                <button className="btn bg-[#e2f1e7] hover:bg-[#cde0d3] py-2 px-4 hover:underline rounded-full transition-all">
                  {" "}
                  <a
                    href="#"
                    className=""
                    style={{ fontFamily: "Mireille-Regular" }}
                  >
                    Explore more
                  </a>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={assets.wild_forest_mushroom_arancini}
              alt="wild_forest_mushroom_arancini"
              className="object-contain h-96 rounded"
            />
          </div>
        </div>
      </div>
      {/* Reservation */}
      <div
        className="flex justify-center items-center h-[40vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${assets.reservationBg})` }}
      >
        <div className="mx-auto">
          <div className="flex flex-col justify-center items-center mx-auto py-3">
            <h2
              className="font-semibold text-white text-2xl"
              style={{ fontFamily: "Mireille-Bold" }}
            >
              Make a reservation
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center mx-auto mb-0 py-3">
            <button className="btn bg-[#e2f1e7] hover:bg-[#cde0d3] py-2 px-4 rounded transition-all">
              <NavLink
                to="/customer/reservation"
                className="font-semibold"
                style={{ fontFamily: "Mireille-Regular" }}
              >
                Find a table
              </NavLink>
            </button>
          </div>
        </div>
      </div>
      <div className="content h-[80vh]">
        {/* Activities */}
        <div className="grid grid-cols-2 gap-4 min-h-full">
          <div className="flex justify-center items-center">
            <img
              src={assets.wild_forest_mushroom_arancini}
              alt="wild_forest_mushroom_arancini"
              className="object-contain h-96 rounded"
            />
          </div>
          <div className="flex justify-start items-center">
            <div className="pr-24 py-6">
              <h1
                className="font-semibold text-gray-900 uppercase text-stone-400 text-2xl"
                style={{ fontFamily: "Mireille-Light" }}
              >
                Whats happening at our restaurant
              </h1>
              <h1
                className="font-semibold text-gray-900 uppercase text-dark text-4xl pt-3"
                style={{ fontFamily: "Mireille-Bold" }}
              >
                Special Event
              </h1>
              <hr className="h-px mb-8 mt-1 bg-gray-200 border-0 dark:bg-gray-700 w-[200px]" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                malesuada, dolor nec porttitor volutpat, nunc metus ultrices
                libero, nec tincidunt libero turpis vel nunc. Nullam nec
                pellentesque neque. Sed nec nunc nec dui ultricies lacinia.
              </p>
              <div className="flex justify-start pt-3">
                <button className="btn bg-[#e2f1e7] hover:bg-[#cde0d3] py-2 px-4 rounded-full transition-all">
                  {" "}
                  <a
                    href="#"
                    className=""
                    style={{ fontFamily: "Mireille-Regular" }}
                  >
                    Book your place now
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
