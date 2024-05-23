import React, { useState } from "react";

const QuantityProduct = ({ onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1); // Start value at 1

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      onQuantityChange(newQuantity);
      return newQuantity;
    });
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

export default QuantityProduct;
