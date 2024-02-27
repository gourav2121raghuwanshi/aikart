import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:"AIzaSyC24iUiSVD5FST6HvDA5H8YjExL6ybO2rg",
  authDomain: "aiclient.firebaseapp.com",
  projectId: "aiclient",
  storageBucket: "aiclient.appspot.com",
  messagingSenderId: "876162230179",
  appId: "1:876162230179:web:d5a1c3c6fabb3619b65c16",
  measurementId: "G-V39P90318K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
