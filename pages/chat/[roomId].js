import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, googleProvider, signInWithPopup, signOut, sendMessage, listenToMessages } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ChatRoom() {
  const router = useRouter();
  const { roomId } = router.query;
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

    if (roomId) {
      const unsubscribe = listenToMessages(roomId, setMessages);
      return () => unsubscribe(); // Cleanup listener
    }
  }, [roomId]);

  const handleSend = () => {
    if (user && message.trim()) {
      sendMessage(roomId, user.displayName, message);
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Private Chat Room: {roomId}</h2>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={() => signOut(auth)}>Logout</button>
          
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
          <button onClick={handleSend}>Send</button>
        </div>
      ) : (
        <button onClick={() => signInWithPopup(auth, googleProvider)}>Login with Google</button>
      )}
    </div>
  );
}