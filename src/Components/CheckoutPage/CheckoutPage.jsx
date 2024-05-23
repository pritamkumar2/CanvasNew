import React, { useState } from "react";
import { useAuth } from "../../ContextApi/AppProvider";
import { useNavigate } from "react-router-dom";
export default function CheckoutPage() {
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);
  const [changeText1, setChangeText1] = useState("City");
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user);
  let [firstName, lastName] = user?.msg?.username?.split(" ");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    region: "",
    country: "",
    zip: "",
    phone: "",
    state: "",
  });

  const handleText1 = (e) => {
    setChangeText1(e);
    setDropdown1(false);
  };

  const handleGeolocation = () => {
    const apiKey = import.meta.env.VITE_LOCATION_API_KEY;
    const apiUrl = import.meta.env.VITE_LOCATION_API_URL;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        let query = `${latitude}, ${longitude}`;
        let apiDataUrl = `${apiUrl}?key=${apiKey}&q=${query}&pretty=1`;

        fetch(apiDataUrl)
          .then((response) => response.json())
          .then((data) => {
            console.log("data locations", data);
            console.log(
              "data locations",
              data.results[0]?.formatted,
              "iggwnggw",
              data?.results[0]?.components?.city
            );

            setFormData({
              ...formData,
              firstName: firstName,
              lastName: lastName,
              address: data.results[0]?.formatted,
              city: data?.results[0]?.components?.city,
              country: data?.results[0]?.components?.country,
              zip: data?.results[0]?.components?.postcode,
              state: data?.results[0]?.components?.state,
            });
            setChangeText1(data.results[0]?.components?.city);
          })
          .catch((error) => {
            console.error("Error fetching geolocation data:", error);
          });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="overflow-y-hidden">
      <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44">
        <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
          <div className="flex w-full flex-col justify-start items-start">
            <div>
              <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Check out
              </p>
            </div>
            <div className="mt-2">
              <a
                href="javascript:void(0)"
                className="text-base leading-4 underline hover:text-gray-800 text-gray-600"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                Back to my bag
              </a>
            </div>
            <div className="mt-12">
              <p className="text-xl font-semibold leading-5 text-gray-800">
                Shipping Details
              </p>
            </div>
            <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8">
              <button
                onClick={handleGeolocation}
                className="px-2 py-4 border-b border-gray-200 leading-4 text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full bg-gray-100 hover:bg-gray-200"
              >
                Auto Fill Data
              </button>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                type="text"
                placeholder="First Name"
                required
              />
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                type="text"
                placeholder="Last Name"
                required
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                type="text"
                placeholder="Address"
                required
              />
              <input
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                type="text"
                placeholder="Address (line 02) (optional)"
              />
              <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                <div className="relative w-full">
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                    type="text"
                    placeholder="city"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                <div className="w-full">
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 pt-4 pb-3 w-full"
                    type="text"
                    placeholder="state"
                    required
                  />
                </div>
                <div className="w-full">
                  <input
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 pt-4 pb-3 w-full"
                    type="text"
                    placeholder="Zip Code"
                    required
                  />
                </div>
              </div>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                type="text"
                placeholder="Phone Number"
                required
              />
            </div>
            <button className="focus:outline-none  focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800">
              Proceed to payment
            </button>
            <div className="mt-4 flex justify-start items-center w-full">
              <a
                href="javascript:void(0)"
                className="text-base leading-4 underline focus:outline-none focus:text-gray-500 hover:text-gray-800 text-gray-600"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                Back to my bag
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
            <div>
              <h1 className="text-2xl font-semibold leading-6 text-gray-800">
                Order Summary
              </h1>
            </div>
            <div className="flex mt-7 flex-col items-end w-full space-y-6">
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Total items</p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  20
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Total Charges</p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  $2790
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">
                  Shipping charges
                </p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  $90
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Sub total </p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  $3520
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full items-center mt-32">
              <p className="text-xl font-semibold leading-4 text-gray-800">
                Estimated Total
              </p>
              <p className="text-lg font-semibold leading-4 text-gray-800">
                $2900
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
