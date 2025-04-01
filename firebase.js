import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyAaYXsW4uqSHOLDgXnxN-24eNNBzOPEPSU",
  authDomain: "smartstudy-991d9.firebaseapp.com",
  databaseURL: "https://smartstudy-991d9-default-rtdb.firebaseio.com/", // Add this line
  projectId: "smartstudy-991d9",
  storageBucket: "smartstudy-991d9.appspot.com",
  messagingSenderId: "710684419194",
  appId: "1:710684419194:web:b65746f3ac33fbee4547c3",
  measurementId: "G-PMT0NCGHGJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app); // Add this export