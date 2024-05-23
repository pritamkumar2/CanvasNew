import React, { Fragment, useEffect, useState, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useFilterContext } from "../../ContextApi/Filter_context";
import { useAuth } from "../../ContextApi/AppProvider";
function Dropdowns() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [colorOptions, setColorOptions] = useState([
    { theValue: "white", theLabel: "White", checked: false },
    { theValue: "beige", theLabel: "Beige", checked: false },
    { theValue: "blue", theLabel: "Blue", checked: false },
    { theValue: "brown", theLabel: "Brown", checked: false },
    { theValue: "green", theLabel: "Green", checked: false },
    { theValue: "purple", theLabel: "Purple", checked: false },
    { theValue: "grey", theLabel: "grey", checked: false },
    { theValue: "black", theLabel: "black", checked: false },
  ]);
  const dropdownRef = useRef(null);
  const { filter_products, dispatch } = useFilterContext();
  const { products } = useAuth();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleCheckboxChange = (index) => {
    const updatedOptions = colorOptions.map((option, i) =>
      i === index ? { ...option, checked: !option.checked } : option
    );
    setColorOptions(updatedOptions);

    const selectedColors = updatedOptions
      .filter((option) => option.checked)
      .map((option) => option.theValue);
    dispatch({ type: "SET_COLOR_FILTER", payload: selectedColors });
    console.log("here data is", selectedColors);
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        id="dropdownBgHoverButton"
        data-dropdown-toggle="dropdownBgHover"
        className="dropdown-button text-white bg-orange-300  flex justify-center items-center h-8 w-[70%] rounded-lg mt-5"
        type="button"
        onClick={handleDropdownToggle}
      >
        <h4>Color</h4>
        <ChevronDownIcon className="w-4 h-4 ms-3" aria-hidden="true" />
      </button>

      <div
        id="dropdownBgHover"
        className={`dropdown-content z-10 ${
          openDropdown ? "block" : "hidden"
        } w-48 bg-white rounded-lg shadow dark:bg-gray-700`}
      >
        <ul
          className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownBgHoverButton"
        >
          {colorOptions.map((color, index) => (
            <li key={index}>
              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  id={`checkbox-item-${index}`}
                  type="checkbox"
                  checked={color.checked}
                  onChange={() => handleCheckboxChange(index)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={`checkbox-item-${index}`}
                  className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                >
                  {color.theLabel}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dropdowns;
