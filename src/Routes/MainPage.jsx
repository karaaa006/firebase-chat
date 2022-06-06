import { useState } from "react";
import { Chat } from "../components/Chat/Chat";
import { ChatContainer } from "../components/Chat/ChatContainer";
import { SideBar } from "../components/Chat/SideBar";

export const MainPage = () => {
  const [activeChatId, setActiveChatId] = useState("JKjXJBxdnzAZLmXgysfP");

  return (
    <ChatContainer>
      <SideBar activeChatId={activeChatId} setActiveChatId={setActiveChatId} />
      <Chat chatId={activeChatId} />
    </ChatContainer>
  );
};
