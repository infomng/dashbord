import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = (state: Boolean) => {
  const [socket, setSocket] = useState(io());

  const fetchMessage = () => {
    try {
      setSocket(io("http://localhost:8800"));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [!state]);

  return { socket };
};

export default useSocket;
