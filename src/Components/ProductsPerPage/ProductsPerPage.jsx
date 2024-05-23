import React, { useState } from "react";
import { Pagination, Button } from "@nextui-org/react";
import AllProductCard from "../AllProductPageCard/AllProductCard";

const ProductsPerPage = 9;

const ProductGrid = ({ filter_products }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * ProductsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage;
  const currentProducts = filter_products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filter_products.length / ProductsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="lg:col-span-3 w-full  ">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {currentProducts.map((product, i) => (
          <div key={product._id} className="flex justify-center">
            <AllProductCard key={i} product={product} />
          </div>
        ))}
      </div>
      <br />
      <br />
      <div className="flex justify-center mt-4">
        <Pagination
          total={totalPages}
          color="warning"
          page={currentPage}
          onChange={goToPage}
        />
      </div>
      <div className="flex justify-center mt-2 ">
        <Button
          size="sm"
          variant="flat"
          color="warning"
          onClick={prevPage}
          disabled={currentPage === 1}
          style={{ marginRight: "130px" }} // Add margin-right for gap
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="flat"
          color="warning"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductGrid;
