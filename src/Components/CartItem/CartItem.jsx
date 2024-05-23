import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCartContext } from "../../ContextApi/Cart_context";
import { useAuth } from "../../ContextApi/AppProvider";
import Quantity from "../../Components/Quantity/Quantity";
import FormatPrice from "../../Helpers/FormatPrice";

const CartItem = ({ product }) => {
  const { dispatch } = useCartContext();
  const [quantity, setQuantity] = useState(product.quantity);
  const { user, api } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${api}/getCart/${user?.msg?.id}`);
        if (response.data.message === "Cart fetched successfully") {
          dispatch({ type: "SET_CART", payload: response.data.cartItems });
        }
      } catch (error) {
        console.error("Failed to fetch cart", error);
      }
    };

    fetchCart();
  }, [api, user?.msg?.id, dispatch]);

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(`${api}/removeCartItem/${user?.msg?.id}/${productId}`);
      if (response.data.message === "Item removed successfully") {
        dispatch({ type: "REMOVE_ITEM", payload: { id: productId } });
        const updatedCartResponse = await axios.get(`${api}/getCart/${user?.msg?.id}`);
        if (updatedCartResponse.data.message === "Cart fetched successfully") {
          dispatch({ type: "SET_CART", payload: updatedCartResponse.data.cartItems });
        }
      }
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img src={product.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
          <p className="mt-1 text-xs text-gray-700">Size: {product.size}</p>
          <p className="mt-1 text-xs text-gray-700">
            Colour: {product.colour}
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                marginRight: "4px",
                backgroundColor: product.colour,
                verticalAlign: "middle",
              }}
            ></span>
          </p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <Quantity
            initialQuantity={product.quantity}
            onQuantityChange={(newQuantity) => setQuantity(newQuantity)}
            products={product}
          />
          <div className="flex items-center space-x-4">
            <p className="text-sm">
              <FormatPrice price={product.amount * quantity} />
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
              onClick={() => handleRemoveItem(product.id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <p>
            Discount <span className="text-green-500">{product?.product?.discountPercent || 0}%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
