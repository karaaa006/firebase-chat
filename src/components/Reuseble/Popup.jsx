import { useRef } from "react";
import styled from "styled-components";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const StyledPopup = styled.div`
  position: absolute;
  left: 50%;
  bottom: ${({ pos }) => (pos === "top" ? "calc(100% + 12px)" : "unset")};
  top: ${({ pos }) => (pos === "bottom" ? "calc(100% + 12px)" : "unset")};
  transform: translateX(-50%);

  padding: 15px;
  border-radius: 5px;

  background-color: #f0f0f3;
  box-shadow: 2px 2px 7px 0px #aeaec066;

  opacity: ${({ isShown }) => (isShown ? "1" : "0")};
  visibility: ${({ isShown }) => (isShown ? "visible" : "hidden")};
`;

export const Popup = ({ isShown, setIsShown, pos = "top", children }) => {
  const ref = useRef();

  useOnClickOutside(ref, () => setIsShown(false));
  return (
    <StyledPopup isShown={isShown} pos={pos} ref={ref}>
      {children}
    </StyledPopup>
  );
};
