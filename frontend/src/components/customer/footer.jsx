import "../../css/customer/koalaFooter.css";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { IoMdMail } from "react-icons/io";

import Map from ".././customer/Map";

export default function Footer() {
  return (
    <>
      <footer class="general-footer pt-5" id="#contact">
        <div class="mx-auto w-full max-w-screen-xl">
          <div class="grid gap-8 px-4 py-6 lg:py-8 md:grid-cols-2 sm:grid-cols-1">
            <div>
              <h2 class="font-semibold text-gray-900 uppercase dark:text-white text-2xl">
                Contact us
              </h2>
              <hr className="my-2 w-[250px]"></hr>
              <ul class="text-gray-900 dark:text-white font-medium">
                <li class="mb-4">
                  <div className="flex inline-flex items-center">
                    <IoMdHome className="inline-block mr-1 text-lg" />
                    <p>123 Somewhere St, Ho Chi Minh city</p>
                  </div>
                </li>
                <li class="mb-4">
                  <div className="flex inline-flex items-center">
                    <IoMdMail className="inline-block mr-1" />
                    <p>therelaxingkoala@gmail.com</p>
                  </div>
                </li>
                <li class="mb-4">
                  <div className="flex inline-flex items-center">
                    <FaPhoneAlt className="inline-block mr-1" />
                    <p>+84 123 456 789</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google map */}
            <div id="googleMap">
              <Map />
            </div>
          </div>
        </div>
      </footer>

      {/* Copy-right Layer */}
      <div class="copy-right px-4 py-6 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
          © 2024 <a href="#">Koala Team</a>. All Rights Reserved.
        </span>
        <div class="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
          <a
            href="#"
            class="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 8 19"
            >
              <path
                fill-rule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Facebook page</span>
          </a>

          <a
            href="#"
            class="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-twitter-x"
              viewBox="0 0 16 16"
            >
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
            <span class="sr-only">Twitter page</span>
          </a>
          <a
            href="#"
            class="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">GitHub account</span>
          </a>
        </div>
      </div>
    </>
  );
}
