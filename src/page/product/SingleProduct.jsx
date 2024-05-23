import React, { useState } from "react";
import "./singleProduct.css";
import FeedbackSection from "../../Components/Review&Rating/FeedbackSection";
import RateSection from "../../Components/Review&Rating/RateSection";
import ReviewsSection from "../../Components/Review&Rating/ReviewsSection";
import ProductDetailSection from "../../Components/ProductDetail/ProductDetailSection";
import ProductGrid from "../../Components/ProductsPerPage/ProductsPerPage";
import { useAuth } from "../../ContextApi/AppProvider";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const [showRating, setShowRating] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { products } = useAuth();
  const { id } = useParams();

  const currentProducts = products.find((product) => product._id === id);
  const similarProducts = products.filter(
    (product) =>
      product.category === currentProducts.category && product._id !== id
  );

  const handleRateClick = (e) => {
    e.preventDefault();
    setShowRating(true);
    setShowReviews(false);
    setShowFeedback(false);
  };

  const handleReviewClick = (e) => {
    e.preventDefault();
    setShowRating(false);
    setShowReviews(true);
    setShowFeedback(false);
  };

  const handleFeedbackClick = (e) => {
    e.preventDefault();
    setShowRating(false);
    setShowReviews(false);
    setShowFeedback(true);
  };

  return (
    <div>
      <div className="text-gray-900 py-4 bg-white">
        <div className="container mx-auto px-6">
          <div className="py-3 ">
            <ProductDetailSection />
            {/* Rating, Reviews, and Feedback Buttons */}

            <div className="mt-6 flex justify-start items-center ">
              <button onClick={handleRateClick} className="  button-80  ">
                <p className="flex justify-center"> Rate</p>
              </button>

              <button onClick={handleReviewClick} className="button-80">
                <p className="flex justify-center"> Reviews</p>
              </button>
              <button onClick={handleFeedbackClick} className="button-80 ">
                <p className="flex justify-center"> Q/A</p>
              </button>
            </div>

            {showRating && <RateSection />}

            {showReviews && <ReviewsSection />}

            {showFeedback && <FeedbackSection />}
          </div>
        </div>

        <div className=" flex justify-center items-center mb-12">
          <h3 className="font-bold text-black">Similar Product</h3>
        </div>

        <div className=" flex items-center justify-center lg:col-span-3 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
            <ProductGrid filter_products={similarProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
