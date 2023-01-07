import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Forum from "./Forum";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showForum, setShowForum] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowForum(true);
    }
  };

  return (
    <div className="App">
      {!showForum ? (
        <div className="joinForumContainer">
          <h3>Join A Forum</h3>
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Forum socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
