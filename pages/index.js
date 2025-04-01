import { useState } from "react";
import { useRouter } from "next/router";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState(null);
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substr(2, 8); // Generate a short random ID
    router.push(`/chat/${newRoomId}`);
  };

  const joinRoom = () => {
    if (roomId.trim()) {
      router.push(`/chat/${roomId}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Szark Chat</h2>
      {user ? (
        <div>
          <button onClick={() => signOut(auth)}>Logout</button>
          
          <h3>Create a Private Room</h3>
          <button onClick={createRoom}>Start New Chat</button>

          <h3>Join an Existing Room</h3>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <button onClick={() => signInWithPopup(auth, googleProvider)}>Login with Google</button>
      )}
    </div>
  );
}