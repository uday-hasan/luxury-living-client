// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvay7SdtDlBiYj_3o1xOi3nGszXUrA6ug",
  authDomain: "luxury-living-uday-hasan.firebaseapp.com",
  projectId: "luxury-living-uday-hasan",
  storageBucket: "luxury-living-uday-hasan.appspot.com",
  messagingSenderId: "252261386809",
  appId: "1:252261386809:web:1e1737d8a369b7c5b35be8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
