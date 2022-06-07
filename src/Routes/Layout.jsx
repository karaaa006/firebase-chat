import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100vh;

  padding: 30px 15px;
  background-color: #f0f0f3;

  /* background: linear-gradient(to right, #e0eafc, #cfdef3); */
`;

export const Layout = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};
