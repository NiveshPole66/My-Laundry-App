// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB13PMCYCg5mWHg4Z_lFVamk565_7-zojw",
  authDomain: "laundryapp-2d78a.firebaseapp.com",
  projectId: "laundryapp-2d78a",
  storageBucket: "laundryapp-2d78a.appspot.com",
  messagingSenderId: "63226834222",
  appId: "1:63226834222:web:8cb60050f9a2d0cdf15ebf",
  measurementId: "G-VMQEV6ZKVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore();

export {auth,db};