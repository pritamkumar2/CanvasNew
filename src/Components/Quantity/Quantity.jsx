import React, { useState } from "react";
import { useCartContext } from "../../ContextApi/Cart_context";
import axios from "axios";
import { useAuth } from "../../ContextApi/AppProvider";
const Quantity = ({ initialQuantity, onQuantityChange, products }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { dispatch } = useCartContext();
  const { user, api } = useAuth();

  const fetchUpdatedCart = async () => {
    try {
      console.log("Cart fetched successfully");

      const response = await axios.get(`${api}/getCart/${user?.msg?.id}`);
      console.log(response);
      if (response.status === 200) {
        dispatch({ type: "SET_CART", payload: response?.data });
      }
    } catch (error) {
      console.error("Failed to fetch updated cart", error);
    }
  };

  const increaseQuantity = async () => {
    const id = products?.id;
    const userId = user?.msg?.id;

    try {
      const response = await axios.patch(
        `${api}/increasequantity/${userId}/${id}`
      );
      console.log("Increase quantity response:", response.data);
      if (response.data.message === "Item quantity increased") {
        const newQuantity = response.data.updatedCartItem.quantity;
        setQuantity(newQuantity);
        console.log("New quantity after increase:", response.data);
        onQuantityChange(newQuantity);
        await fetchUpdatedCart();
      }
    } catch (error) {
      console.error("Failed to increase quantity", error);
    }
  };

  const decreaseQuantity = async () => {
    const id = products?.id;
    const userId = user?.msg?.id;

    if (quantity > 1) {
      try {
        const response = await axios.patch(
          `${api}/decreasequantity/${userId}/${id}`
        );
        console.log("Decrease quantity response:", response.data);
        if (response.data.message === "Item quantity decreased") {
          const newQuantity = response.data.cartItem.quantity;
          setQuantity(newQuantity);
          console.log("New quantity after decrease:", newQuantity);
          onQuantityChange(newQuantity);
          await fetchUpdatedCart();
        }
      } catch (error) {
        console.error("Failed to decrease quantity", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l"
        onClick={decreaseQuantity}
      >
        -
      </button>
      <span className="px-3 py-1 bg-gray-100">{quantity}</span>
      <button
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r"
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
