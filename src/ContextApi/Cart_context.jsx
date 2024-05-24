import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import cartReducer from "../Reducers/cartReducer";
import { useAuth } from "../ContextApi/AppProvider";

const CartContext = createContext();

const getLocalCartData = () => {
  let newCartData = localStorage.getItem("cart");
  if (!newCartData || newCartData === "[]") {
    return [];
  } else {
    return JSON.parse(newCartData);
  }
};

const initialState = {
  cart: [],
  total_item: "",
  total_amount: "",
  shipping_fee: 50000,
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();
  const api = import.meta.env.VITE_BACKENDAPILINK;

  useEffect(() => {
    const getCartData = async () => {
      console.log("i am the link bro", `${api}/getCart/${user.msg.id}`);
      if (user?.msg?.id) {
        try {
          const response = await axios.get(`${api}/getCart/${user.msg.id}`);

          console.log(response);
          dispatch({ type: "SET_CART", payload: response.data || [] });
        } catch (error) {
          console.error("Failed to fetch cart data", error);
        }
      }
    };

    getCartData();
  }, [user]);

  const addToCart = (
    singleProduct,
    selectedSize,
    selectedColor,
    id,
    amount,
    quantity
  ) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        singleProduct,
        selectedSize,
        selectedColor,
        id,
        amount,
        quantity,
      },
    });
  };

  const removeItem = (id) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        id,
      },
    });
  };

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ ...state, dispatch, addToCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const cartContextValue = useContext(CartContext);
  if (!cartContextValue) {
    throw new Error("useCartContext used outside of the provider");
  }
  return cartContextValue;
};
