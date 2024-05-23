import React, { useState, useEffect } from "react";
import FormatPrice from "../../Helpers/FormatPrice";
import { useFilterContext } from "../../ContextApi/Filter_context";
import { useAuth } from "../../ContextApi/AppProvider";

const PriceSlider = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const { filter_products, dispatch } = useFilterContext();
  const { products } = useAuth();
  console.log(products);
  useEffect(() => {
    // Calculate min and max prices from products
    if (products && products.length > 0) {
      const prices = products.map((product) => product.price.discount);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products]);

  const handlePriceChange = (e) => {
    const newPriceRange = [...priceRange];
    newPriceRange[e.target.dataset.index] = parseFloat(e.target.value);
    setPriceRange(newPriceRange);
    // Dispatch the new price range to update the filter data
    dispatch({
      type: "SET_PRICE_RANGE",
      payload: {
        min: newPriceRange[0],
        max: newPriceRange[1],
      },
    });
  };

  return (
    <div>
      <h4 className="text-sm mt-5">
        Range: {<FormatPrice price={priceRange[0]} />} -{" "}
        {<FormatPrice price={priceRange[1]} />}
      </h4>
      <div className="flex items-center justify-between">
        <input
          type="number"
          min={priceRange[0]}
          max={priceRange[1]}
          step={1}
          value={priceRange[0]}
          onChange={handlePriceChange}
          data-index={0}
          className="w-1/2 px-2 py-1 border border-gray-300 rounded-md"
        />
        <span className="mx-2">to</span>
        <input
          type="number"
          min={priceRange[0]}
          max={priceRange[1]}
          step={1}
          value={priceRange[1]}
          onChange={handlePriceChange}
          data-index={1}
          className="w-1/2 px-2 py-1 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default PriceSlider;
