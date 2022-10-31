// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.GATSBY_API_KEY,
  authDomain: "zhuk-photon.firebaseapp.com",
  projectId: "zhuk-photon",
  storageBucket: "zhuk-photon.appspot.com",
  messagingSenderId: process.env.GATSBY_MESSAGING_ID,
  appId: process.env.GATSBY_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);