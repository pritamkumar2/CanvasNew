import React, { useEffect, useState, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useFilterContext } from "../../ContextApi/Filter_context";
import { useAuth } from "../../ContextApi/AppProvider";
function SizeDropdown() {
  const { filter_products, dispatch } = useFilterContext();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [sizeOptions, setSizeOptions] = useState([
    { theValue: "2xl", theLabel: "2xl", checked: false },
    { theValue: "6l", theLabel: "6L", checked: false },
    { theValue: "12l", theLabel: "12L", checked: false },
    { theValue: "18l", theLabel: "18L", checked: false },
    { theValue: "20l", theLabel: "20L", checked: false },
    { theValue: "40l", theLabel: "40L", checked: false },
  ]);

  const dropdownRef = useRef(null);


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
    
    const updatedOptions = sizeOptions.map((option, i) =>
      i === index ? { ...option, checked: !option.checked } : option
    );
    setSizeOptions(updatedOptions);

    const selectedSizes = updatedOptions
      .filter((option) => option.checked)
      .map((option) => option.theValue);

    // Dispatch action to set size filter
    dispatch({ type: "SET_SIZE_FILTER", payload: selectedSizes });
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        className="dropdown-button text-white bg-orange-300 flex justify-center items-center h-8 w-[70%] rounded-lg mt-5"
        type="button"
        onClick={handleDropdownToggle}
      >
        <h4>Size</h4>
        <ChevronDownIcon className="w-4 h-4 ms-3" aria-hidden="true" />
      </button>

      <div
        className={`dropdown-content z-10 ${
          openDropdown ? "block" : "hidden"
        } w-48 bg-white rounded-lg shadow`}
      >
        <ul className="p-3 space-y-1 text-sm text-gray-700">
          {sizeOptions.map((size, index) => (
            <li key={index}>
              <div className="flex items-center p-2 rounded hover:bg-gray-100">
                <input
                  id={`checkbox-item-${index}`}
                  type="checkbox"
                  checked={size.checked}
                  onChange={() => handleCheckboxChange(index)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`checkbox-item-${index}`}
                  className="w-full ms-2 text-sm font-medium text-gray-900"
                >
                  {size.theLabel}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SizeDropdown;
