import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */

  max-height: 100%;

  padding: 25px;
  border-radius: 5px;

  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
`;

export const ChatContainer = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};
