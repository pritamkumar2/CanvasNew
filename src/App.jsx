import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbars from "./navigation/Navbars";
import Home from "./page/Home";

import About from "./page/About";
import Contact from "./page/Contact";
import Product from "./page/Product";
import SingleProduct from "./page/product/SingleProduct";
import Cart from "./page/Cart/Cart";
import CheckoutPage from "./Components/CheckoutPage/CheckoutPage.jsx";
import "./App.css";
import Footer from "./navigation/Footer";
import MyProfile from "./page/MyProfile/MyProfile.jsx";

import Login from "./Auth/Login";

import Forget from "./Auth/Forget";
import Signup from "./Auth/Signup.jsx";
import Error404 from "./page/ErrorPage/Error404";
import Logout from "./Auth/Logout.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbars />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/singleProduct/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/cart/checkout" element={<CheckoutPage />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error404 />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
