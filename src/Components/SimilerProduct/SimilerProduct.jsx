import React from "react";
import "./similerProduct.css";
import { useNavigate } from "react-router-dom";

const SimilerProduct = (product) => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${product?._id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="productCard rounded-t-2xl shadow-xl w-full md:w-[15rem] mx-auto border m-3 transition-all cursor-pointer"
    >
      <div className="h-48 md:h-[20rem]">
        <img
          className="h-full rounded-t-2xl w-full object-cover object-center"
          src={product?.imageUrl}
          alt={product?.name}
        />
      </div>
      <div className="textPart rounded-t-2xl border-b-2 border-[#ffec45] p-3">
        <div className="flex flex-col">
          <p className="font-bold opacity-60 text-sm md:text-base">
            {product?.description}
          </p>
          <p className="text-sm md:text-base overflow-hidden max-h-[5vh]">
            {product?.name}
          </p>
          <p className="font-semibold">₹{product?.price?.discount}</p>
          <div className="flex items-center">
            <p className="opacity-50 line-through">
              ₹{product?.price?.regular}
            </p>
            <p className="text-green-600 font-semibold ml-2">
              {product?.discountPersent}% off
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilerProduct;
