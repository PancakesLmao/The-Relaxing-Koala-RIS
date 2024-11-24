import { useState, useEffect } from "react";
import FixedHeader from "../../components/customer/fixedHeader";
import assets from "../../assets/image-assets.json"
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
      <div className="container mx-auto py-8 px-8 mt-[8rem]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.menu_item_id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
            >
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={assets[item.image_name]} // Use the image from the assets
                  alt={item.item_name}
                />
              </a>
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
