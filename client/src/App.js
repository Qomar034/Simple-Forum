import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Forum from "./Forum";

import axios from "axios"
const serverUrl = "http://localhost:3001/"
const socket = io.connect(serverUrl);

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showForum, setShowForum] = useState(false);
  const [previousMessage, setPreviousMessage] = useState([])

  const joinRoom = async () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      await fetchMessages()
      setShowForum(true);
    }
  };

  const fetchMessages = async () => {
    try {
      let { data } = await axios.get(serverUrl + 'forum/' + 'Mojokerto')
      console.log(data);
      setPreviousMessage(data)
    } catch (error) {
      console.log(error);
    }
  }

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
        <Forum socket={socket} username={username} room={room} previousMessage={previousMessage} />
      )}
    </div>
  );
}

export default App;
