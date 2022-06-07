import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../App";

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;

  gap: 10px;
`;
const StyledItem = styled.li`
  padding: 15px 25px;
  border-radius: 50px;

  background-color: ${({ isActive }) => (isActive ? "#FB7575" : "#f0f0f3")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#000")};
  box-shadow: 2px 2px 7px 0px #aeaec066, -2px -2px 7px 0px #ffffff;

  cursor: pointer;

  transition: color 300ms ease, background-color 300ms ease;
`;

export const ChatList = ({ chatList }) => {
  const { currentChat, setCurrentChat } = useContext(Context);

  const handleChatClick = (chatId) => {
    setCurrentChat(chatId);
  };

  return (
    <StyledList>
      {chatList?.map(({ id, name }) => (
        <StyledItem
          key={id}
          onClick={() => handleChatClick(id)}
          isActive={currentChat === id}
        >
          {name}
        </StyledItem>
      ))}
    </StyledList>
  );
};
