import { useState, useEffect } from "react";
import FixedHeader from "../../components/customer/fixedHeader";
import assets from "../../assets/image-assets.json";
export default function CustomerMenu() {
  const MENU_API = "http://127.0.0.1:8000/menus/get-menu-items";
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch(MENU_API)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((data) => {
        setMenuItems(data);
        console.log(menuItems);
      })
      .catch((response) => {
        response.json().then((data) => console.error(data));
      });
  }, []);
  return (
    <>
      <FixedHeader />
      <div className="relative mt-[8rem]">
        <img
          src="https://img.freepik.com/premium-photo/photo-collage-set-food-dishes-black-stone-background_187166-65794.jpg?w=1380"
          alt="menu_banner"
          className="h-[70vh] w-full object-cover px-[6rem]"
        />
      </div>
      <div className="container mx-auto py-8">
        <div className="bg-[#4a614c] flex flex-col px-7 items-center justify-center my-4 sticky top-[6rem]">
          <h1
            className="font-semibold text-white uppercase text-dark lg:text-4xl text-2xl pt-3"
            style={{ fontFamily: "Mireille-Bold" }}
          >
            Restaurant Menu
          </h1>
          <hr className="h-px my-2 mt-1 bg-white border-0 w-[225px]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-[3rem]">
          {menuItems.map((item) => (
            <div
              key={item.menu_item_id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow w-64"
            >
              <img
                className="h-64 object-cover rounded-t-lg"
                src={assets[item.image_name]}
                alt={item.item_name}
              />
              <div className="p-5">
                <h5
                  className="mb-2 text-md font-bold tracking-tight text-gray-900"
                  style={{ fontFamily: "Mireille-Regular" }}
                >
                  {item.item_name}
                </h5>
                <p className="mb-3 font-normal text-gray-700">
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit
                  amet, consectetur, adipisci velit...
                </p>
                <p>Price: ${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
