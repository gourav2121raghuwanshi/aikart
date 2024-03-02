// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC24iUiSVD5FST6HvDA5H8YjExL6ybO2rg",
  authDomain: "aiclient.firebaseapp.com",
  projectId: "aiclient",
  storageBucket: "aiclient.appspot.com",
  messagingSenderId: "876162230179",
  appId: "1:876162230179:web:d5a1c3c6fabb3619b65c16",
  measurementId: "G-V39P90318K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);