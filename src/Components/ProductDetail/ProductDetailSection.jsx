import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormatPrice from "../../Helpers/FormatPrice";
import { useAuth } from "../../ContextApi/AppProvider";
import Loding from "../../PreLoading/Loding";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import StarRating from "../Review&Rating/StarRating";
import "./productDetails.css";
import { useCartContext } from "../../ContextApi/Cart_context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import QuantityProduct from "../QuantityProduct/QuantityProduct";

const ProductDetailSection = () => {
  const { id } = useParams();
  const { api, getSingleProduct, isSingleLoading, singleProduct, user } =
    useAuth();
  const { addToCart } = useCartContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(
    singleProduct?.colours?.length === 1 ? singleProduct?.colours[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  const amount = singleProduct?.price?.discount;
  const navigate = useNavigate();

  const handleSelect = (size) => setSelectedSize(size);
  const handleColorSelect = (color) => setSelectedColor(color);
  const handleSelectImg = (imageUrl) => setSelectedImage(imageUrl);

  useEffect(() => {
    getSingleProduct(`${api}/singleProducts/${id}`);
  }, [id]);

  const handleAddToCart = async () => {
    const url = `${api}/addCart/${user?.msg?.id}`;
    try {
      if (!selectedSize) {
        toast.warn("📏 Please select a size", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
      if (!selectedColor && singleProduct?.colours?.length > 1) {
        toast.warn("📏 Please select a color", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }

      const productId = selectedColor ? `${id}-${selectedColor}` : `${id}-null`;
      const data = {
        id: productId,
        name: singleProduct?.name,
        image: singleProduct?.imageUrl,
        amount: amount,
        size: selectedSize,
        colour: selectedColor,
        product: id,
        quantity: quantity,
      };

      const response = await axios.post(url, data);
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("fromProductPage", "true");
        navigate("/Cart");
      } else {
        console.log("Data not sent from productDetailSection");
      }
    } catch (e) {
      console.log(e, "Error from productDetailSection axios ");
    }
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return (
    <div className="block lg:flex">
      {/* Product Image and Details */}
      <div className="w-full lg:w-1/2">
        <div
          className="relative flex flex-wrap justify-center item-center"
          style={{ paddingBottom: "10.5%" }}
        >
          <div
            className="relative flex flex-wrap justify-center item-center aspect-w-13 aspect-h-20"
            style={{ maxWidth: "100%", maxHeight: "20rem" }}
          >
            <img
              className="h-full w-full object-contain"
              src={selectedImage || singleProduct?.imageUrl}
              alt={singleProduct?.name}
            />
          </div>
        </div>
        <div className="-mx-2 flex flex-wrap">
          {[1, 2, 3, 4]?.map((_, index) => (
            <img
              key={index}
              className="w-1/4 h-16 lg:h-32 object-cover px-2 py-2 rounded cursor-pointer"
              src="https://source.unsplash.com/W1yjvf5idqA"
              alt={`Product ${index + 1}`}
              onClick={() =>
                handleSelectImg(
                  `https://source.unsplash.com/W1yjvf5idqA?sig=${index}`
                )
              }
            />
          ))}
        </div>
      </div>
      {/* Product Details */}
      <div className="w-full lg:w-1/2 lg:px-12">
        <h1 className="text-4xl text-black">{singleProduct?.name}</h1>
        <div className="text-2xl text-orange-400">
          <FormatPrice price={singleProduct?.price?.discount} />
          <span className="ml-2 text-base line-through text-gray-400">
            <FormatPrice price={singleProduct?.price?.regular} />
          </span>
        </div>
        <div className="flex justify-start items-center">
          <div>
            <StarRating rating={singleProduct?.rating} />
          </div>
          <div className=" ml-2">
            <p>({singleProduct?.comments?.length})</p>
          </div>
        </div>
        <br />
        <div className="mt-6 pt-6 border-t text-gray-700">
          <p className="py-2">
            The purposes of bonsai are primarily contemplation for the viewer,
            and the pleasant exercise of effort and ingenuity for the grower.
          </p>
          <p className="py-2">{singleProduct?.description}</p>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <h4 className="font-bold mt-4">Colours</h4>
            <div className="flex justify-start">
              <div className="flex flex-wrap gap-4 mb-3">
                {singleProduct?.colours?.map((color, i) => (
                  <div
                    key={i}
                    className={`border border-black rounded-full p-2 cursor-pointer ${
                      selectedColor === color
                        ? "border-gradient-blue border-2 shadow-outline"
                        : ""
                    }`}
                    onClick={() => handleColorSelect(color)}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <QuantityProduct onQuantityChange={handleQuantityChange} />
        <div>
          <h4 className="text-2xl font-bold text-orange-400 mt-4">
            Select Size
          </h4>
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex flex-wrap gap-4">
            {singleProduct?.size?.map((size, i) => (
              <div
                key={i}
                className={`border border-black rounded-md p-2 cursor-pointer ${
                  selectedSize === size
                    ? "border-gradient-blue border-2 shadow-outline"
                    : ""
                }`}
                onClick={() => handleSelect(size)}
              >
                <p>{size}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-2">
          <div>
            <div className="flex justify-center mt-6">
              <LocalShippingIcon />
            </div>
            <p className="ml-2 text-sm">fast delivery</p>
          </div>
          <div>
            <div className="flex justify-center mt-6">
              <PaymentIcon />
            </div>
            <p className="ml-2 text-sm">easy Payment</p>
          </div>
          <div>
            <div className="flex justify-center mt-6">
              <AutoModeIcon />
            </div>
            <p className="ml-2 text-sm">easy refund</p>
          </div>
        </div>
        <div>
          <button
            className="button-50 mt-6 w-full"
            role="button"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSection;
