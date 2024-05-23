import React, { useState, useEffect } from "react";
import { useAuth } from "../../ContextApi/AppProvider";
import { Input } from "@nextui-org/react";
import { useFilterContext } from "../../ContextApi/Filter_context";
import { useLocation } from "react-router-dom";
import { SearchIcon } from "../../navigation/SearchIcon";
import { useNavigate } from "react-router-dom";

const Searching = () => {
  const { products } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { dispatch } = useFilterContext();
  const location = useLocation();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();

    const results = products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(query);
      const tagMatch = product.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      );
      return nameMatch || tagMatch;
    });

    dispatch({ type: "SEARCH_PRODUCTS", payload: results });

    setSearchQuery(query);
    setSearchResults(results);
    setIsSearchVisible(true); // Show results when there's a search query
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate("/products");
    }
  };

  useEffect(() => {
    setIsSearchVisible(false);
  }, [location]);

  return (
    <div className="relative z-50 bg-white">
      <Input
        className={{
          base: "max-w-full sm:max-w-[10rem] h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Type to search..."
        size="sm"
        startContent={<SearchIcon size={12} />}
        type="search"
        value={searchQuery}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsSearchVisible(true)}
      />
      {isSearchVisible && searchQuery && (
        <ul className="absolute top-full left-0 right-0 mt-2 z-40 bg-white divide-y divide-gray-200 sm:w-64 md:w-96 max-h-60 overflow-y-auto">
          {searchResults.map((product) => (
            <li
              key={product._id}
              className="py-2 cursor-pointer"
              onClick={() => {
                navigate(`/products`);
              }}
            >
              <div className="flex items-center">
                <span className="font-medium">{product.name}</span> -{" "}
                {product.tags.map((tag) => {
                  const tagLower = tag.toLowerCase();
                  const queryLower = searchQuery.toLowerCase();
                  let matchingSubstring = "";

                  for (let i = 0; i < queryLower.length; i++) {
                    if (tagLower[i] === queryLower[i]) {
                      matchingSubstring += tag[i];
                    } else {
                      break;
                    }
                  }

                  return (
                    <span key={tag} className="text-gray-500">
                      {matchingSubstring}
                    </span>
                  );
                })}
              </div>
              <p className="text-sm text-gray-500">{product.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searching;
