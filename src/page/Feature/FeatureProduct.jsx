import React from "react";
import { useAuth } from "../../ContextApi/AppProvider";
import Loding from "../../PreLoading/Loding.jsx";
import { useNavigate } from "react-router-dom";
import "./feature.css";
const FeatureProduct = () => {
  const { featureProducts, isLoading, products } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h2 className="text-2xl text-start font-bold text-gray-800 py-5 flex items-center justify-center">
          feature Products
        </h2>
        {isLoading === true ? (
          <Loding />
        ) : (
          <div>
            <div className="container-animex">
              <div className="container-anime">
                {featureProducts.map((product, index) => (
                  <div
                    key={index}
                    className={`box box-${index + 1}`}
                    style={{
                      "--img": `url(${product.imageUrl})`,
                    }}
                    data-text={product.name}
                    onClick={() => navigate(`/products/${product?.name}`)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FeatureProduct;
