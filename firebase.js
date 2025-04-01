import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, doc } from "firebase/firestore";

// 🔹 Firebase Config from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Function to send messages to a specific room
const sendMessage = async (roomId, user, text) => {
  if (!roomId || !text.trim()) return;
  await addDoc(collection(db, "chats", roomId, "messages"), {
    text,
    user,
    timestamp: new Date(),
  });
};

// Function to listen for messages in a specific room
const listenToMessages = (roomId, callback) => {
  if (!roomId) return;
  const q = query(collection(db, "chats", roomId, "messages"), orderBy("timestamp", "asc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  });
};

export { auth, googleProvider, signInWithPopup, signOut, db, sendMessage, listenToMessages };