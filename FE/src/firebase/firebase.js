// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEuoWUOU9_CZ1ABnY_0zp6VVALNg9WkZg",
  authDomain: "itdle-148f8.firebaseapp.com",
  projectId: "itdle-148f8",
  storageBucket: "itdle-148f8.firebasestorage.app",
  messagingSenderId: "361811307632",
  appId: "1:361811307632:web:a8ace3931335a37641d8b5",
  measurementId: "G-C46H4VRB58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

// const analytics = getAnalytics(app);
