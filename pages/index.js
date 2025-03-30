import { useState, useEffect } from "react";
import { auth, googleProvider, signInWithPopup, signOut, db, collection, addDoc, query, orderBy, onSnapshot } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
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

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      setUsers(usersSnapshot.docs.map((doc) => doc.data()));
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser) return;
  
    const chatId = getChatId(user, selectedUser);
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp", "asc"));
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  
    return () => unsubscribe();
  }, [selectedUser]);

  const getChatId = (user1, user2) => {
    return user1.uid < user2.uid ? `${user1.uid}_${user2.uid}` : `${user2.uid}_${user1.uid}`;
  };
  
  const createChatIfNotExists = async (user1, user2) => {
    const chatId = getChatId(user1, user2);
    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);
  
    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        users: [user1.uid, user2.uid],
        createdAt: new Date(),
      });
    }
    return chatId;
  };

  const sendPrivateMessage = async (receiver) => {
    if (message.trim() && user) {
      const chatId = await createChatIfNotExists(user, receiver);
  
      await addDoc(collection(db, "chats", chatId, "messages"), {
        text: message,
        sender: user.uid,
        timestamp: new Date(),
      });
  
      setMessage(""); // Clear input field
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
          <select onChange={(e) => setSelectedUser(users.find(u => u.uid === e.target.value))}>
            <option value="">Select a user</option>
            {users.map((u) => (
              <option key={u.uid} value={u.uid}>{u.name}</option>
            ))}
          </select>
          <button onClick={() => sendPrivateMessage(selectedUser)}>Start Chat</button>
          <div>
            {messages.map((msg) => (
              <p key={msg.id}>
                <strong>{msg.sender === user.uid ? "Me" : selectedUser.name}:</strong> {msg.text}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <button onClick={async () => await signInWithPopup(auth, googleProvider)}>Login with Google</button>
      )}
    </div>
  );
}