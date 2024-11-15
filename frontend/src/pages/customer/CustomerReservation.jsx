import React, { useRef } from "react";
import FixedHeader from "../../components/customer/fixedHeader";
import { handleSubmit } from "../../js/customer/handleSubmit";
import "../../assets/image-assets.json";

export default function CustomerReservation() {
  const fullName = useRef();
  const phone = useRef();
  const numPeople = useRef();
  const date = useRef();
  const time = useRef();
  const note = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      customer_name: fullName.current.value,
      customer_phone: phone.current.value,
      notes: note.current.value,
      number_of_people: parseInt(numPeople.current.value),
      date_reserved: `${date.current.value}T${time.current.value}`.toString(),
    };
    // debug line
    console.table(formData);

    try {
      const response = await handleSubmit(formData);
      if (response && response.ok) {
        alert("Reservation submitted successfully");
        e.currentTarget.reset();
      } else {
        alert("Failed to submit reservation");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <>
      <div className="" style={{ backgroundImage: `url("")` }}>
        <FixedHeader />
        <div className="min-h-[105vh] flex items-center justify-center pt-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-[#28472a]">
                Make a Reservation
              </h2>
            </div>
            <form onSubmit={onSubmit} class="max-w-md mx-auto bg-white">
              {/* Full name */}
              <div class="relative z-0 w-full mb-5 group">
                <input
                  ref={fullName}
                  type="text"
                  id="fullname"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-[#28472a] focus:outline-none focus:ring-0 focus:border-[#28472a] peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="fullname"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#28472a] peer-focus:dark:text-[#28472a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Full name
                </label>
              </div>

              {/* Phone */}
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                    ref={phone}
                    id="phone"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-[#28472a] dark:focus:border-[#28472a] focus:outline-none focus:ring-0 focus:border-[#28472a] peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="phone"
                    class="peer-focus:font-medium absolute text-sm text-[#28472a] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#28472a] peer-focus:dark:text-[#28472a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Contact number
                  </label>
                </div>
                {/* Number of people */}
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    ref={numPeople}
                    id="num_people"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-[#28472a] dark:focus:border-[#28472a] focus:outline-none focus:ring-0 focus:border-[#28472a] peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="num_people"
                    class="peer-focus:font-medium absolute text-sm text-[#28472a] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#28472a] peer-focus:dark:text-[#28472a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Number of people
                  </label>
                </div>
              </div>
              {/* Date */}
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="date"
                    ref={date}
                    id="date"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-[#28472a] dark:focus:border-[#28472a] focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="date"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#28472a] peer-focus:dark:text-[#28472a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Date
                  </label>
                </div>
                {/* Time */}
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="time"
                    ref={time}
                    id="time"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-[#28472a] dark:focus:border-[#28472a] focus:outline-none focus:ring-0 focus:border-[#28472a] peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="time"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#28472a] peer-focus:dark:text-[#28472a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Time
                  </label>
                </div>
              </div>
              {/* Special note */}
              <div class="relative z-0 w-full mb-5 group">
                <label className="">Special note (optional)</label>
                <textarea
                  id="note"
                  ref={note}
                  className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-[#28472a] focus:outline-none focus:ring-0 focus:border-[#28472a] peer"
                  placeholder="Tell us if you have any special request (e.g. baby seats, etc.)"
                  rows={5}
                ></textarea>
              </div>
              {/* Submit button */}
              <button
                type="submit"
                class="text-white bg-[#558d57] hover:bg-[#28472a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#558d57] dark:hover:bg-[#28472a] dark:focus:ring-blue-800 transition ease-in-out delay-70"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
