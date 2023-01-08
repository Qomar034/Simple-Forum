import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Forum({ socket, username, room, previousMessage }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // const [oldMessage, setOldMessage] = useState(previousMessage)
//   console.log(messageList, '<== message list');
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        UserId: 1,
        title: "Mojokerto",
        room: room,
        author: username,
        message: currentMessage,
        text: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      console.log(messageList);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    // setMessageList(previousMessage.Messages)
    console.log(previousMessage.Messages);

    let oldMessages = previousMessage.Messages.map(el => {
      el.room = room
      el.author = el.User.name
      el.message = el.text
      el.time = new Date(el.createdAt).getHours() +
      ":" +
      new Date(el.createdAt).getMinutes()
      return el
    })
    console.log(oldMessages);
    setMessageList(oldMessages);
  }, [])
  return (
    <div className="forum-window">
      <div className="forum-header">
        <p>Live Forum Room {room}</p>
      </div>
      <div className="forum-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="forum-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Forum;
