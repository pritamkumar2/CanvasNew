import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import { useCartContext } from "../../ContextApi/Cart_context";
import Quantity from "../../Components/Quantity/Quantity";
import FormatPrice from "../../Helpers/FormatPrice";
import CartItem from "../../Components/CartItem/CartItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useCartContext();
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [totalAmountWithDiscount, setTotalAmountWithDiscount] = useState(null);
  const [totalAmounts, setTotalAmount] = useState();
  const [totalDiscount, setTotalDiscount] = useState();
  const [avgDiscount, setAvgDiscount] = useState();

  const promoCode = "LIGHTUP15";

  console.log(cart);
  useEffect(() => {
    const fromProductPage = localStorage.getItem("fromProductPage");
    if (fromProductPage) {
      localStorage.removeItem("fromProductPage");
      window.location.reload();
    }

    if (cart) {
      const totalAmount = cart.reduce(
        (total, item) => total + item.amount * item.quantity,
        0
      );
      setTotalAmount(totalAmount);

      const totalDiscount = cart.reduce((total, item) => {
        const regularPrice = item.product.price.regular;
        const discountPrice = item.amount;
        const discountPercent =
          ((regularPrice - discountPrice) / regularPrice) * 100;
        return total + discountPercent * item.quantity;
      }, 0);

      setTotalDiscount(totalDiscount);

      const averageDiscount =
        cart.length > 0
          ? totalDiscount /
            cart.reduce((total, item) => total + item.quantity, 0)
          : 0;
      setAvgDiscount(parseFloat(averageDiscount.toFixed(2)));

      console.log("update", totalAmount, totalDiscount);
    }
  }, [cart]);

  const handlePromo = () => {
    if (promoCodeInput === promoCode) {
      const discount = totalAmounts * 0.15;
      const discountedTotalAmount = totalAmounts - discount;

      toast.success("🥳 Promo applied successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTotalAmountWithDiscount(discountedTotalAmount);
    } else {
      toast.error("Promo expired!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleCheckout = () => {
    const checkoutData = {
      cart,
      totalAmounts,
      totalAmountWithDiscount: totalAmountWithDiscount || totalAmounts,
      totalDiscount,
    };

    navigate("/Cart/checkout");
  };

  return (
    <div className="bg-white pt-20">
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 mb-3">
        <div className="rounded-lg md:w-2/3">
          {cart.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">
              <FormatPrice price={totalAmounts} />
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">
              <FormatPrice price={0} />
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Discount</p>
            <p className="text-green-700">{avgDiscount} %</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              {totalAmountWithDiscount ? (
                <>
                  <p className="mb-1 text-lg font-bold text-green-700">
                    <FormatPrice price={totalAmountWithDiscount} />
                  </p>
                  <p className="text-sm text-gray-700">Including GST</p>
                  <p className="mb-1 text-sm text-gray-500 line-through">
                    <FormatPrice price={totalAmounts} />
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-1 text-lg font-bold text-green-700">
                    <FormatPrice price={totalAmounts} />
                  </p>
                  <p className="text-sm text-gray-700">Including GST</p>
                </>
              )}
            </div>
          </div>
          <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
            Promo Code
          </label>
          <div className="flex pb-4 w-full relative">
            <button
              id="dropdown-button"
              className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent absolute left-0 top-0 pl-2"
              type="button"
            >
              <svg
                className="ml-2 my-auto"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <input
              type="text"
              className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400"
              placeholder="xxxx xxxx xxxx"
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
            />
            <button className="ml-3 button-50" onClick={handlePromo}>
              Apply
            </button>
          </div>
          <button
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            onClick={handleCheckout}
          >
            Check out
          </button>
          <div>
            <button
              className="cart-btn"
              onClick={() => {
                navigate("/products");
              }}
            >
              <i className="animation"></i> Continue shopping
              <i className="animation"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
