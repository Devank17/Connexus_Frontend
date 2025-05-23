import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
const serverUrl = "http://localhost:8080";

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io(serverUrl, { secure: false });
    setSocket(newSocket);
  }, []);

  const sendMsg = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  useEffect(() => {
    if (!socket) return;
    
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

  }, [socket]);

  return (
    <>
      <h1 className="text-2xl">Connexus</h1>

      <form action="">
        <input
          type="text"
          className="border border-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={(e) => sendMsg(e)}>Send</button>
      </form>

      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
