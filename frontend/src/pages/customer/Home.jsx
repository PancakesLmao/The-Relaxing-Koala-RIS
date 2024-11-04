import "../../css/customer/home.css";
import video from "../../assets/3769033-hd_1920_1080.mp4";
//
export default function Home() {
  return (
    <>
      <div className="video-container">
        <div className="relative video-bg">
          <video
            autoPlay
            muted
            loop
            src={video}
            className="object-cover"
          ></video>
        </div>
      </div>
      <div className="content">
        <h1>WELCOME TO OUR RESTAURANT</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          malesuada, dolor nec porttitor volutpat, nunc metus ultrices libero,
          nec tincidunt libero turpis vel nunc. Nullam nec pellentesque neque.
          Sed nec nunc nec dui ultricies lacinia.
        </p>
        <button className="btn">Explore</button>
      </div>
    </>
  );
}
