import { useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";
import "./chat.scss";

const Chat = () => {
  const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<string[]>([]);
  const [state, setState] = useState(false);
  const {socket} = useSocket(state);
  console.log(message);
  console.log(messages);



  //Emit new message to the server
  const sendMessage = (event:any) => {
    event.preventDefault();
    socket.emit("newMessage", message);
    setMessage("");

    // Listen for new messages from the server
    socket.on("newMessage", (message) => {
      console.log("Received new message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  };




   useEffect(() => {
     // Clean up the socket connection when the component unmounts
     return () => {
       socket.disconnect();
     };
   }, []);

  return (
    <div className="container">
      <h1>Real-time chat</h1>
      <div className="messages">
        <div>
          {messages.map((message, index) => (
            <div key={index}> {message}</div>
          ))}
        </div>
        <div>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              className="input"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
