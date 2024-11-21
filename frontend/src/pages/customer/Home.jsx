import "../../css/customer/koalaHome.css";
import assets from "../../assets/image-assets.json";
// import video from "../../assets/3769033-hd_1920_1080.mp4";
import Header from "../../components/customer/header";
//
export default function Home() {
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
            className="object-cover"
          ></video>
        </div>
      </div>
      <div className="content h-[80vh]">
        <div className="grid grid-cols-2 gap-4 min-h-full">
          <div className="flex justify-center items-center">
            <div className="px-24 py-6">
              <h1 className="font-semibold text-gray-900 uppercase text-dark text-2xl text-mute">
                WELCOME TO OUR RESTAURANT
              </h1>
              <h1 className="font-semibold text-gray-900 uppercase text-dark text-2xl py-3">
                ABOUT US
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                malesuada, dolor nec porttitor volutpat, nunc metus ultrices
                libero, nec tincidunt libero turpis vel nunc. Nullam nec
                pellentesque neque. Sed nec nunc nec dui ultricies lacinia.
              </p>
              <p className="text-end pr-6">
                {" "}
                <a href="#" className="hover:underline transition-all">
                  Explore more {">>"}
                </a>
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={assets.wild_forest_mushroom_arancini}
              alt="wild_forest_mushroom_arancini"
              className="object-contain h-96"
            />
          </div>
        </div>
      </div>
    </>
  );
}
