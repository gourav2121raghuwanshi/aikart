import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBNaw_p0t7zfSrqW_2rJ42c9NO_vK9-zrc",
  authDomain: "travelbuddy-a8c3e.firebaseapp.com",
  projectId: "travelbuddy-a8c3e",
  storageBucket: "travelbuddy-a8c3e.appspot.com",
  messagingSenderId: "214504541684",
  appId: "1:214504541684:web:885c5a1aee471623897da1",
  measurementId: "G-5SH2XP54KW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
