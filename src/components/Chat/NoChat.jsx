import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../App";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 700px;
  max-height: 100%;
`;

export const NoChat = () => {
  const { setMobileMenuIsOpen } = useContext(Context);

  return (
    <Wrap>
      <div onClick={() => setMobileMenuIsOpen(true)}>Select chat</div>
    </Wrap>
  );
};
