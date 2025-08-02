// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDllj9ABsPfTzAre3z_NoFCCbShkQpZ118",
  authDomain: "backend-testing-74452.firebaseapp.com",
  projectId: "backend-testing-74452",
  storageBucket: "backend-testing-74452.firebasestorage.app",
  messagingSenderId: "960697962094",
  appId: "1:960697962094:web:13f51a5525d870b2b9207f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
