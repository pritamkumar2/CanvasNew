import AliceCarousel from "react-alice-carousel";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductCardDisplay.css";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { useState } from "react";

const ProductDisplay = ({ section, data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const responsive = {
    0: {
      items: 1.7,
      itemsFit: "contain",
    },
    720: {
      items: 3,
      itemsFit: "contain",
    },
    1024: {
      items: 5,
      itemsFit: "contain",
    },
  };

  const handleSlideChanged = ({ item }) => {
    setActiveIndex(item);
  };

  const slidePrev = () => {
    setActiveIndex((prevIndex) => prevIndex - 1);
  };

  const slideNext = () => {
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const isNextButtonDisabled =
    activeIndex === data.length - responsive[1024].items;
  const isPrevButtonDisabled = activeIndex === 0;

  const items = data
    .slice(activeIndex, activeIndex + responsive[1024].items)
    .map((item, index) => <ProductCard key={index} product={item} />);
  console.log(items);
  return (
    <div className="relative">
      <h2 className="text-2xl text-start font-bold text-gray-800 py-5">
        {section}
      </h2>

      <div className="relative p-5">
        <div className="my-2">
          <AliceCarousel
            items={items}
            disableButtonsControls={true}
            mouseTracking={true}
            responsive={responsive}
            disableDotsControls
            onSlideChanged={handleSlideChanged}
            activeIndex={activeIndex}
          />
        </div>

        {!isNextButtonDisabled && (
          <button
            className="z-30 md:flex absolute top-40 right-1 hidden bg-[#cc7ddd]"
            onClick={slideNext}
            aria-label="next"
          >
            <KeyboardArrowLeftIcon />
          </button>
        )}
        {!isPrevButtonDisabled && (
          <button
            className="z-30 md:flex absolute top-40 left-1 rotate-180 hidden bg-[#c05fd5]"
            onClick={slidePrev}
            aria-label="prev"
          >
            <KeyboardArrowLeftIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDisplay;
