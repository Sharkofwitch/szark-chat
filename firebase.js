// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut, db, collection, addDoc, query, orderBy, onSnapshot };
// This code initializes a Firebase application with the provided configuration.
// It imports necessary functions from the Firebase SDK for authentication.
// It sets up Google authentication using the GoogleAuthProvider.
// The auth object is used to interact with Firebase Authentication.
// The googleProvider object is used to handle Google sign-in.
// The signInWithPopup function is used to sign in users with a Google account.
// The signOut function is used to sign out users from the Firebase Authentication.
// The Firebase configuration includes API key, project ID, and other necessary details.
// The Firebase app is initialized using the initializeApp function.