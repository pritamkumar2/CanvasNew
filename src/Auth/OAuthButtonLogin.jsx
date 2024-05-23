import { signInWithPopup } from "firebase/auth";
import { useAuth } from "../ContextApi/AppProvider";
import { useCartContext } from "../ContextApi/Cart_context";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import axios from "axios";
const OAuthButtons = () => {
  const { googleLoginAuth, api, storeFireTokenInLs } = useAuth();
  const { cart } = useCartContext();
  const navigate = useNavigate();

  const googleLogin = async () => {
    try {
      const url = `${api}/fireUser`;
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      if (result.user) {
        const data = {
          id: `${result?.user?.providerData[0]?.uid}`,
          username: `${result?.user?.providerData[0]?.displayName}`,
          email: `${result?.user?.providerData[0]?.email}`,
          photoURL: `${result?.user?.providerData[0]?.photoURL}`,
          isAdmin: false,
          __v: 0,
        };

        const response = await axios.post(url, data);
        console.log("i am the ", response.data);
        const token = response.data.token;
        if (cart?.length > 0) {
          navigate("/cart");
        } else {
          navigate("/");
        }
        storeFireTokenInLs(token);
        googleLoginAuth(data, token);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <ul className=" buttons w-[60%]">
        <li>
          <button
            className="button button--full"
            onClick={(e) => {
              e.preventDefault();
              googleLogin();
            }}
          >
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <use xlinkHref="#icon-google" />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default OAuthButtons;
