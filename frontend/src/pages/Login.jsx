import React, { useState } from "react";
import { handleLogin } from "../js/staff/handleLogin";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await handleLogin(formData);
    if (result) {
      alert("Login successful");
      // Redirect
      navigate("/staff");
    } else {
      setError("Failed to login. Please check your credentials and try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="bg-[#b0dbb2] flex flex-col items-center justify-center min-h-screen">
        <div className="rounded-lg border bg-[#e2f1e7] text-card-foreground shadow-sm w-full max-w-md">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="mt-6 text-center text-3xl font-extrabold text-[#28472a]">
              Staff Login
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Enter your staff information
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
            <div className="grid md:grid-cols-2 gap-x-0">
              {/* Firstname */}
              <div className="relative z-0 w-full group xl:pl-7 md:pl-7 sm:px-3">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-dark"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="bg-gray-50 border border-[#558d57] rounded-lg  block w-full p-2.5 placeholder-dark text-dark"
                  placeholder=" "
                  required
                />
              </div>
              {/* Lastname */}
              <div className="relative z-0 w-full group xl:pr-7 md:pr-7 sm:px-3">
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-dark"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="bg-gray-50 border border-[#558d57] rounded-lg  block w-full p-2.5 placeholder-dark text-dark"
                  placeholder=" "
                  required
                />
              </div>
            </div>
            {/* Password */}
            <div className="relative z-0 w-full mb-5 group px-7">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-dark"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border border-[#558d57] rounded-lg  block w-full p-2.5 placeholder-dark text-dark"
                placeholder=" "
                required
              />
            </div>
            {/* Submit button */}
            {error && (
              <p className="text-sm text-muted-foreground text-center text-red">
                {error}
              </p>
            )}
            <div className="flex justify-center items-center pt-1 pb-5">
              {!loading ? (
                <button
                  type="submit"
                  className="w-auto text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#558d57] hover:bg-[#28472a] focus:ring-[#28472a] transition ease-in-out delay-70"
                >
                  Login
                </button>
              ) : (
                <button
                  type="button"
                  class="inline-flex items-center w-auto text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#558d57]"
                  disabled
                >
                  <svg
                    class="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
