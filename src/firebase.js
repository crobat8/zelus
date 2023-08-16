// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRtVxX4GnfUOwFZaS7FOe_Ti2mVqhMBuM",
  authDomain: "cwu-track-practice-website.firebaseapp.com",
  databaseURL: "https://cwu-track-practice-website-default-rtdb.firebaseio.com",
  projectId: "cwu-track-practice-website",
  storageBucket: "cwu-track-practice-website.appspot.com",
  messagingSenderId: "589401596646",
  appId: "1:589401596646:web:323b2e9328da0d3e869127",
  measurementId: "G-JVTNXGD13Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();
