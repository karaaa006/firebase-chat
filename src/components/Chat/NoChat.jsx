import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 700px;
  max-height: 100%;
`;

export const NoChat = () => {
  return <Wrap>Select chat</Wrap>;
};
