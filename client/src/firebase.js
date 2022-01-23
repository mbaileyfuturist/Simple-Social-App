import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5eOtGz1_1mGPZ_xyuvIF0UHXCiFtnn60",
    authDomain: "social-media-application-e63b9.firebaseapp.com",
    databaseURL: "https://social-media-application-e63b9-default-rtdb.firebaseio.com",
    projectId: "social-media-application-e63b9",
    storageBucket: "social-media-application-e63b9.appspot.com",
    messagingSenderId: "116768975419",
    appId: "1:116768975419:web:f04886a995cef4c22b4a1e"
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)