import React, { useState, useEffect } from "react";
import { useAuth } from "../../ContextApi/AppProvider";
import { useCartContext } from "../../ContextApi/Cart_context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormatPrice from "../../Helpers/FormatPrice";

export default function CheckoutPage() {
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);
  const [changeText1, setChangeText1] = useState("City");

  const [cartData, setCartData] = useState({
    cartLength: 0,
    totalCharges: 0,
    shippingCharge: 0,
    subTotal: 0,
  });

  const { user, api } = useAuth();
  const { cart } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`${api}/getCart/${user?.msg?.id}`);
        const totalAmount = response?.data?.reduce(
          (total, item) => total + item.amount * item?.quantity,
          0
        );

        const totalDiscount = response?.data?.reduce((total, item) => {
          const regularPrice = item.product.price.regular;
          const discountPrice = item.amount;
          const discountPercent =
            ((regularPrice - discountPrice) / regularPrice) * 100;
          return total + discountPercent * item.quantity;
        }, 0);

        const averageDiscount =
          response?.data?.length > 0
            ? totalDiscount /
              response?.data?.reduce((total, item) => total + item.quantity, 0)
            : 0;
        const discount = parseFloat(averageDiscount.toFixed(2));

        const cartLength = response.data.length;
        const shippingCharge = 10; // Replace with actual calculation if available
        const subTotal = totalAmount - (totalAmount * discount) / 100;

        setCartData({
          cartLength,
          totalCharges: totalAmount,
          shippingCharge,
          subTotal,
        });

        console.log("All data:", totalAmount, discount, cartLength);
        console.log("Response:", response);
      } catch (error) {
        console.log("Response error:", error);
      }
    };

    fetchCartData();
  }, [api, user, cart]);

  const [firstName, lastName] = user?.msg?.username?.split(" ") || ["", ""];
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
            console.log("Data locations:", data);
            console.log(
              "Formatted address:",
              data.results[0]?.formatted,
              "City:",
              data?.results[0]?.components?.city
            );

            setFormData({
              ...formData,
              firstName,
              lastName,
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

  const handleOrderSave = async () => {
    try {
      const orderData = {
        userId: user?.msg?.id,
        items: cart,
        shippingDetails: formData,
        totalAmount: cartData.subTotal,
        paymentStatus: "Pending", // or "Completed" based on actual payment status
      };

      const response = await axios.post(`${api}/saveOrder`, orderData);
      console.log("Order saved:", response.data);
      // Redirect or show confirmation
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error saving order:", error);
    }
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
                onClick={() => navigate("/cart")}
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
                    placeholder="City"
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
                    placeholder="State"
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
            <button
              onClick={handleOrderSave}
              className="focus:outline-none focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800"
            >
              Proceed to payment
            </button>
            <div className="mt-4 flex justify-start items-center w-full">
              <a
                href="javascript:void(0)"
                className="text-base leading-4 underline focus:outline-none focus:text-gray-500 hover:text-gray-800 text-gray-600"
                onClick={() => navigate("/cart")}
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
                  {cartData.cartLength}
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Total Charges</p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  <FormatPrice price={cartData.totalCharges} />
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">
                  Shipping charges
                </p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  <FormatPrice price={0} />
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Sub total</p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  <FormatPrice price={cartData.subTotal} />
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full items-center mt-32">
              <p className="text-xl font-semibold leading-4 text-gray-800">
                Estimated Total
              </p>
              <p className="text-lg font-semibold leading-4 text-gray-800">
                <FormatPrice price={cartData.subTotal} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
