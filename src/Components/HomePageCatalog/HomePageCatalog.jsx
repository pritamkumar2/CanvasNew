import React from "react";
import "./homeCatalog.css";
const HomePageCatalog = () => {
  const images = [
    "https://i.imgur.com/nX2Ojqo.png",
    "https://i.imgur.com/VexZgSN.png",
    "https://i.imgur.com/uF1lv5P.png",
    "https://i.imgur.com/tq2NVBY.png",
    "https://i.imgur.com/2yWYyhn.png",
  ];

  return (
    <div className=" flex flex-wrap items-center justify-center space-x-5">
      {images.map((image, index) => (
        <div key={index} className=" catalog relative   -z-1 ">
          <img
            src={image}
            alt={`Image ${index + 1}`}
            className=" h-[40px]  w-[70px] md:h-[130px]  md:w-[200px] md:rounded-2xl  rounded "
          />
          <p className=" absolute bottom-0 left-0 z-1   font-semibold text-white p-1 ">{`${
            index + 1
          } box`}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePageCatalog;
