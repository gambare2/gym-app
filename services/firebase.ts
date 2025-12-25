import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFj9pR-X0QGbLEfB0U5-2Yf6YHd7IGBBA",
  authDomain: "gym-app-117f1.firebaseapp.com",
  projectId: "gym-app-117f1",
  storageBucket: "gym-app-117f1.firebasestorage.app",
  messagingSenderId: "143995664576",
  appId: "1:143995664576:web:aebdcc2edf8a5998ca5525",
  measurementId: "G-7CPB24C4KP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ✅ SAFE FOR EXPO (Android + iOS + Web)
export const auth = getAuth(app);
