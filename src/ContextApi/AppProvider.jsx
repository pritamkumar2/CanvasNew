import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import reducer from "../Reducers/ProductReducer";
export const AppContext = createContext();

const api = import.meta.env.VITE_BACKENDAPILINK;
const productsApi = `${api}/allProducts`;
const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [firetoken, setFireToken] = useState(localStorage.getItem("fireToken"));

  const [user, setUser] = useState(null);
  const userDataUrl = `${api}/user`;
  const fireUserDataUrl = `${api}/fire`;
  let isLoggedIn = !!token || !!firetoken;
  console.log("i am user", user);
  const googleLoginAuth = (data, token) => {
    setFireToken(token);
  };

  // jwt auth - to get the current user data
  const userAuthentication = async () => {
    try {
      const response = await axios.get(userDataUrl, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fireUserAuthentication = async () => {
    try {
      const response = await axios.get(fireUserDataUrl, {
        headers: {
          Authorization: "Bearer " + firetoken,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error(
        "Error fetching Firebase user data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    userAuthentication();
    fireUserAuthentication();
  }, [firetoken]);

  const fetchData = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(url);
      const products = await response.data;

      dispatch({
        type: "SET_API_DATA",
        payload: products,
      });
    } catch (error) {
      dispatch({
        type: "API_ERROR",
        payload: error,
      });
      console.log("Error fetching products:", error.message);
    }
  };

  const getSingleProduct = async (url) => {
    console.log("SET_SINGLE_LOADING");

    dispatch({ type: "SET_SINGLE_LOADING" });

    try {
      const response = await axios.get(url);
      const singleProduct = await response.data;

      dispatch({
        type: "SET_SINGLEPRODUCT_DATA",
        payload: singleProduct,
      });
    } catch (error) {
      console.log("error from appProvider getSingleProduct", error);
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    fetchData(productsApi);
  }, []);

  const storeTokenInLs = (token) => {
    setToken(token);
    return localStorage.setItem("token", token);
  };

  const storeFireTokenInLs = (token) => {
    setFireToken(token);
    return localStorage.setItem("fireToken", token);
  };
  const LogOutUser = () => {
    setToken("");
    setFireToken("");
    return localStorage.removeItem("token", "fireToken");
  };

  return (
    <AppContext.Provider
      value={{
        api,
        ...state,
        getSingleProduct,
        storeTokenInLs,
        storeFireTokenInLs,
        LogOutUser,
        isLoggedIn,
        token,
        user,
        googleLoginAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AppContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};

export default AppProvider;
