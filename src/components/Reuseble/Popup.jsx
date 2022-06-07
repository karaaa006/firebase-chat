import styled from "styled-components";

const StyledPopup = styled.div`
  position: absolute;
  left: 50%;
  bottom: calc(100% + 12px);
  transform: translateX(-50%);

  padding: 15px;
  border-radius: 5px;

  background-color: #f0f0f3;
  box-shadow: 2px 2px 7px 0px #aeaec066;

  opacity: ${({ isShown }) => (isShown ? "1" : "0")};
  visibility: ${({ isShown }) => (isShown ? "visible" : "hidden")};
`;

export const Popup = ({ isShown, setIsShown, children }) => {
  return <StyledPopup isShown={isShown}>{children}</StyledPopup>;
};
