import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AppProvider";
import reducer from "../Reducers/filterReducer";
const FilterContext = createContext();
const initialState = {
  filter_products: [],
  all_products: [],
  sortingValue: "lowest",
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (state.sortingValue !== "lowest") {
      dispatch({ type: "SORTING_PRODUCTS", payload: products });
    }
  }, [state.sortingValue, products]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);


  return (
    <FilterContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const filterContextValue = useContext(FilterContext);
  if (!filterContextValue) {
    throw new Error("useFilterContext used outside of the provider");
  }
  return filterContextValue;
};
