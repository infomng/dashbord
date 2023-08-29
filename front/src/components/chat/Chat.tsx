import { PrettyChatWindow } from "react-chat-engine-pretty";

const Chat = () => {

  const user = localStorage.getItem('user')
  return (
    <div className="background">
      <PrettyChatWindow
        projectId={import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID}
        username={user?.email}
        secret={user?.secret}
        // style={{ height: "100%" }}
      />
    </div>
  );
};
export default Chat;
