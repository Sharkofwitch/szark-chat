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

  // 🔹 Copy invite link to clipboard
  const copyInviteLink = () => {
    const inviteLink = `${window.location.origin}/chat/${roomId}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert("Invite link copied!");
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Private Chat Room: {roomId}</h2>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={() => signOut(auth)}>Logout</button>

          {/* 🔗 Shareable Invite Link */}
          <p>Invite others to this chat:</p>
          <button onClick={copyInviteLink}>Copy Invite Link</button>

          {/* 🔹 Chat Messages */}
          <div>
            {messages.map((msg) => (
              <p key={msg.id}>
                <strong>{msg.user}:</strong> {msg.text}
              </p>
            ))}
          </div>

          {/* 🔹 Message Input */}
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