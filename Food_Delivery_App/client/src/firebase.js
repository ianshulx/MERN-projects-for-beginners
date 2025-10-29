// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-214d8.firebaseapp.com",
  projectId: "mern-auth-214d8",
  storageBucket: "mern-auth-214d8.firebasestorage.app",
  messagingSenderId: "844453128665",
  appId: "1:844453128665:web:68daf9db6a2f2bc3cc51c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);