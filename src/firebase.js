// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXNo4n2BaQmEq2rIl9pARQK_oKs7iS2_A",
  authDomain: "ecommerce-72971.firebaseapp.com",
  projectId: "ecommerce-72971",
  storageBucket: "ecommerce-72971.appspot.com",
  messagingSenderId: "881444450656",
  appId: "1:881444450656:web:eb8590be198115858c6e05",
  measurementId: "G-DW7C6LBF8P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, FacebookAuthProvider };
