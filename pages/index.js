import { useState, useEffect } from "react";
import { auth, googleProvider, signInWithPopup, signOut, db, collection, addDoc, query, orderBy, onSnapshot } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for authentication changes
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // 🔥 Fetch messages from Firestore in real-time
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const sendMessage = async () => {
    if (message.trim() && user) {
      await addDoc(collection(db, "messages"), {
        text: message,
        user: user.displayName,
        timestamp: new Date(),
      });
      setMessage(""); // Clear input
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Szark Chat</h2>

      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={async () => await signOut(auth)}>Logout</button>

          <div>
            {messages.map((msg) => (
              <p key={msg.id}>
                <strong>{msg.user}:</strong> {msg.text}
              </p>
            ))}
          </div>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      ) : (
        <button onClick={async () => await signInWithPopup(auth, googleProvider)}>Login with Google</button>
      )}
    </div>
  );
}