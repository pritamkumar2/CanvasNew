import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./allProductPage.css";

const AllProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the product detail page
    navigate(`/SingleProduct/${product._id}`);
  };

  return (
    <div
      className="productCard rounded-t-2xl shadow-xl w-full md:w-[15rem] mx-auto border m-3 transition-all cursor-pointer text-black"
      onClick={handleClick} // Handle click event for navigation
    >
      <div className="h-48 md:h-[20rem]">
        <img
          className="h-full rounded-t-2xl w-full object-cover object-center"
          src={product?.imageUrl}
          alt="product image"
        />
      </div>
      <div className="textPart rounded-t-2xl border-b-2 border-[#ffec45] p-3">
        <div className="flex flex-col">
          <p className="font-bold opacity-60 text-sm md:text-base">
            {product?.name}
          </p>
          <p className="text-sm md:text-base overflow-hidden max-h-[5vh]">
            {product?.description}
          </p>
          <p className="font-semibold">₹{product?.price?.discount}</p>
          <div className="flex items-center">
            <p className="opacity-50 line-through">
              ₹{product?.price?.regular}
            </p>
            <p className="text-green-600 font-semibold ml-2">
              {product?.discountPercent}% off
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductCard;
