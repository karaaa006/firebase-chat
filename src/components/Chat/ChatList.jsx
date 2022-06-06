import styled from "styled-components";

const StyledList = styled.ul``;
const StyledItem = styled.li``;

export const ChatList = ({ chatList }) => {
  return (
    <StyledList>
      {chatList.map(({ id, name, newMessageCount, lastMessage }) => (
        <StyledItem key={id}>
          {name}, {lastMessage} ({newMessageCount})
        </StyledItem>
      ))}
    </StyledList>
  );
};
