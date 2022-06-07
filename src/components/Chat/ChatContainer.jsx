import styled from "styled-components";

const Wrap = styled.div`
  display: flex;

  height: 100%;

  gap: 10px;
  padding: 25px;
  border-radius: 5px;

  box-shadow: 2px 2px 7px 0px #aeaec066, -2px -2px 7px 0px #ffffff;
  background-color: #f0f0f3;
`;

export const ChatContainer = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};
