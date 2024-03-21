// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjW4rRGcShGvG-Jc0wPV1PAbEgGh0VNUc",
  authDomain: "millennium-560f9.firebaseapp.com",
  projectId: "millennium-560f9",
  storageBucket: "millennium-560f9.appspot.com",
  messagingSenderId: "95516747955",
  appId: "1:95516747955:web:cfacfa4a46cd57704ba8c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
