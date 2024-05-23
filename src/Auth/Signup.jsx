import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";
import { useAuth } from "../ContextApi/AppProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCartContext } from "../ContextApi/Cart_context";
import OAuthButtons from "./OAuthButtonLogin";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { api, storeTokenInLs } = useAuth();
  const { cart } = useCartContext();
  const navigate = useNavigate();
  const url = `${api}/register`;

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        url,
        {
          username: name,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        const { token } = response.data;
        storeTokenInLs(token);

        toast.success("🎉 Registration successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        console.log("Registration successful, navigating...");
        if (cart?.length > 0) {
          console.log("Navigating to /cart");
          navigate("/cart");
        } else {
          console.log("Navigating to /");
          navigate("/");
        }
      } else {
        toast.error("Registration failed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        `😢 ${
          error.response?.data?.message ||
          "An error occurred during registration. Please try again."
        }`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  return (
    <>
      <div className="iphone w-full">
        <header className="header">
          <a href="#" className="button button--small">
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <use xlinkHref="#icon-arrow-left" />
            </svg>
          </a>
          <h1>Sign Up</h1>
        </header>

        <main className="main">
          <OAuthButtons />
          <div className="flex items-center">
            <div className="flex-1 border-b border-grey"></div>
            <p className="mx-2 text-white">or</p>
            <div className="flex-1 border-b border-grey"></div>
          </div>
          <form className="form" onSubmit={handleRegisterSubmit}>
            <div className="form__field">
              <label className="form__label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="form__input text-neutral-100"
                name="name"
                type="text"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form__field">
              <label className="form__label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="form__input text-neutral-100"
                name="email"
                type="email"
                placeholder="tim@apple.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form__field">
              <label className="form__label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="form__input text-neutral-100"
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form__field">
              <button
                className="button button--full button--primary"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="text--center text-white">
            <p>
              Already have an account? <a href="#">Log in</a>
            </p>
          </div>
        </main>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="icon-apple" viewBox="0 0 24 24">
          <path d="M22 17.607c-.786 2.28-3.139 6.317-5.563 6.361-1.608.031-2.125-.953-3.963-.953-1.837 0-2.412.923-3.932.983-2.572.099-6.542-5.827-6.542-10.995 0-4.747 3.308-7.1 6.198-7.143 1.55-.028 3.014 1.045 3.959 1.045.949 0 2.727-1.29 4.596-1.101.782.033 2.979.315 4.389 2.377-3.741 2.442-3.158 7.549.858 9.426zm-5.222-17.607c-2.826.114-5.132 3.079-4.81 5.531 2.612.203 5.118-2.725 4.81-5.531z"></path>
        </symbol>

        <symbol id="icon-google" viewBox="0 0 24 24">
          <path
            d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </symbol>

        <symbol id="icon-arrow-left" viewBox="0 0 24 24">
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </symbol>
      </svg>
    </>
  );
};

export default Signup;
