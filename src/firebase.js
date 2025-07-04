// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyC57lSTsy4IODw9FpLccKFSxWyTIVuetWY",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "open-calc-12345.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "open-calc-12345",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "open-calc-12345.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abc123",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-ABC123"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

async function updateUserDisplayName(name) {
  await updateProfile(auth.currentUser, { displayName: name });
}