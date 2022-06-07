import { useContext, useState } from "react";
import { Context } from "../App";
import { Chat } from "../components/Chat/Chat";
import { ChatContainer } from "../components/Chat/ChatContainer";
import { NoChat } from "../components/Chat/NoChat";
import { SideBar } from "../components/Chat/SideBar";

export const MainPage = () => {
  const { currentChat } = useContext(Context);

  return (
    <ChatContainer>
      <SideBar />
      {currentChat ? <Chat /> : <NoChat />}
    </ChatContainer>
  );
};
