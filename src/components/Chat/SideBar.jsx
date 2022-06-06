import { signOut } from "firebase/auth";
import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../..";
import { ChatList } from "./ChatList";

const StyledSideBar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Button = styled.button`
  width: fit-content;
  padding: 15px 30px;
  border: none;

  background-color: #fff;

  cursor: pointer;
`;

export const SideBar = () => {
  const chatList = [
    {
      id: 1,
      name: "Oleh Karaulnyi",
      newMessageCount: 2,
      lastMessage: "Lorem ipsum Lorem ipsum Lorem ipsum...",
    },
    {
      id: 2,
      name: "Vitalina",
      newMessageCount: 1,
      lastMessage: "Lorem ipsum Lorem ipsum Lorem ipsum...",
    },
    {
      id: 3,
      name: "Makar",
      newMessageCount: 0,
      lastMessage: "Lorem ipsum Lorem ipsum Lorem ipsum...",
    },
    {
      id: 4,
      name: "Vitya",
      newMessageCount: 0,
      lastMessage: "Lorem ipsum Lorem ipsum Lorem ipsum...",
    },
  ];

  const { auth } = useContext(Context);

  const handleLogout = () => {
    signOut(auth);
  };
  return (
    <StyledSideBar>
      <ChatList chatList={chatList} />
      <Button onClick={handleLogout}>Logout</Button>
    </StyledSideBar>
  );
};
