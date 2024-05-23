// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import AppProvider from "./ContextApi/AppProvider.jsx";
import { ToastContainer } from "react-toastify";
import { FilterContextProvider } from "./ContextApi/Filter_context.jsx";
import { CartContextProvider } from "./ContextApi/Cart_context.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AppProvider>
      <FilterContextProvider>
        <CartContextProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <App />
        </CartContextProvider>
      </FilterContextProvider>
    </AppProvider>
);
