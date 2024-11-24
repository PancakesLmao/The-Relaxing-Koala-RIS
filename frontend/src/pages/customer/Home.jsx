import { useState, useEffect } from "react";
import "../../css/customer/koalaHome.css";
import { NavLink } from "react-router-dom";
import assets from "../../assets/image-assets.json";
import Header from "../../components/customer/header";
import loadFeatured from "../../js/customer/loadFeatured";
//
export default function Home() {
  const [featuredData, setFeaturedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadFeatured();
        setFeaturedData(data);
        console.log(data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="video-container relative">
        <div className="overlay2"></div>
        <div className="relative video-bg">
          <video
            autoPlay
            muted
            loop
            src={assets.homeVideo}
            className="object-cover blur-sm"
          ></video>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white z-50">
            <div className="w-full flex flex-col items-center">
              <div className="lg:w-[60rem] sm:w-full flex lg:justify-start md:justify-center justify-center">
                <h1
                  className="py-2 lg:text-6xl md:text-6xl text-2xl font-bold"
                  style={{ fontFamily: "Mireille-Bold" }}
                >
                  Welcome to
                </h1>
              </div>
              <div className="lg:w-[60rem] w-full flex lg:justify-end md:justify-center justify-center">
                <h2
                  className="py-2 lg:text-7xl md:text-7xl text-3xl font-bold"
                  style={{ fontFamily: "Mireille-Bold" }}
                >
                  The Relaxing Koala
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="before:content-[' '] pt-[5vh]" id="about"></div>
      <div className="content lg:h-[80vh] md:h-100vh sm:h-100vh">
        {/* About us */}
        <div className="lg:grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 min-h-full">
          <div className="flex justify-center items-center">
            <div className="lg:px-24 px-16 py-6">
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
      <div className="before:content-[' '] pt-[5vh]" id="menu"></div>
      {/*  */}
      <div className="py-16 bg-[#4a614c] mx-7 rounded-md">
        <div className="container mx-auto px-6">
          <h2
            className="text-white text-3xl font-semibold text-center mb-8"
            style={{ fontFamily: "Mireille-Bold" }}
          >
            Featured Dishes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredData.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg">
                <img
                  src={assets[`${item.image_name}`]}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "Mireille-Regular" }}
                >
                  {item.name}
                </h3>
                <p className="text-gray-500">
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit
                  amet, consectetur, adipisci velit...
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Feedbacks */}
      <div className="container py-16">
        <div className="mb-[50px] max-xl:mb-[30px] relative mx-auto text-center">
          <h2
            className="font-semibold text-gray-900 uppercase text-dark text-4xl py-4"
            style={{ fontFamily: "Mireille-Bold" }}
          >
            What Our Customer Say
          </h2>
        </div>
        {/* Testimonials */}
        <div className="grid gap-0 md:grid-cols-2 lg:gap-0 mx-7">
          <div className="mb-12 md:mb-0 lg:px-[10rem] md:px-[5rem]">
            <div className="mb-6 flex justify-start">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg"
                className="w-32 rounded-full"
              />
            </div>
            <h5 className="mb-4 text-xl font-semibold">Maria Smantha</h5>
            <h6 className="mb-4 font-semibold text-primary dark:text-primary-400">
              Food Critic
            </h6>
            <p className="mb-4 text-neutral-600">
              <span className="inline-block pe-2 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                </svg>
              </span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos
              id officiis hic tenetur quae quaerat ad velit ab hic tenetur.
            </p>
            <ul className="mb-0 flex items-center justify-start">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-yellow-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-yellow-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-yellow-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-yellow-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <svg
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  fill="currentColor"
                  className="h-5 w-5 text-yellow-500"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44zm.678 2.033v11.904l4.707 2.505-.951-5.236 3.851-3.662-5.314-.756z"
                    fill-rule="nonzero"
                  />
                </svg>
              </li>
            </ul>
          </div>

          <div className="mb-12 md:mb-0 lg:px-[10rem] md:px-[5rem]">
            <div className="mb-6 flex justify-start">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).jpg"
                className="w-32 rounded-full"
              />
            </div>
            <h5 className="mb-4 text-xl font-semibold">John Smith</h5>
            <h6 className="mb-4 font-semibold text-primary dark:text-primary-400">
              Customer
            </h6>
            <p className="mb-4 text-neutral-600">
              <span className="inline-block pe-2 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                </svg>
              </span>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti.
            </p>
            <ul className="mb-0 flex items-center justify-start">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-yellow-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-yellow-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-yellow-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-yellow-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-5 w-5 text-yellow-500 h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Reservation */}
      <div className="before:content-[' '] pt-[5vh]" id="reservation"></div>
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
      <div className="content lg:h-[75vh] md:h-[75vh] sm:h-100vh">
        {/* Activities */}
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 min-h-full">
          <div className="flex justify-center items-center">
            <img
              src={assets.eventsImg}
              alt="wild_forest_mushroom_arancini"
              className="object-contain h-[30rem] rounded"
            />
          </div>
          <div className="flex lg:justify-start md:justify-center sm:justify-center items-center">
            <div className="lg:pr-24 px-16 py-6">
              <h1
                className="font-semibold text-gray-900 uppercase text-stone-400 text-2xl"
                style={{ fontFamily: "Mireille-Light" }}
              >
                Get ready for up coming event
              </h1>
              <h1
                className="font-semibold text-gray-900 uppercase text-dark text-4xl pt-3"
                style={{ fontFamily: "Mireille-Bold" }}
              >
                Koala Christmas Party
              </h1>
              <hr className="h-px mb-8 mt-1 bg-gray-200 border-0 dark:bg-gray-700 w-[200px]" />
              <p>Time Period: 22-24/12/2024</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                malesuada, dolor nec porttitor volutpat, nunc metus ultrices
                libero, nec tincidunt libero turpis vel nunc. Nullam nec
                pellentesque neque. Sed nec nunc nec dui ultricies lacinia.
              </p>
              <div className="flex justify-start pt-3">
                <button className="btn bg-[#e2f1e7] hover:bg-[#cde0d3] py-2 px-4 rounded transition-all">
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
