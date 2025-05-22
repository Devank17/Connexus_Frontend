import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
const serverUrl = "http://localhost:8080";

function App() {
  const socket = io.connect(serverUrl, { secure: false });

  return (
    <>
      <h1 className="text-2xl">Connexus</h1>
    </>
  );
}

export default App;
