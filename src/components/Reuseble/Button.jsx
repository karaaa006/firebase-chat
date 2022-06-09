import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: ${({ p }) => p || "15px 30px"};
  border: none;
  border-radius: 5px;

  width: ${({ w }) => w || "auto"};
  height: ${({ h }) => h || "auto"};

  color: #fb7575;
  background-color: #f0f0f3;
  box-shadow: 2px 2px 7px 0px #aeaec066, -2px -2px 7px 0px #ffffff;

  cursor: pointer;

  transition: background-color 250ms ease, box-shadow 250ms ease;

  :hover {
    background-color: #ece9e9;
  }

  :active {
    box-shadow: 0px 0px 0px 0px #aeaec066, 0px 0px 0px 0px #ffffff,
      2px 2px 7px 0px #aeaec066 inset, -2px -2px 7px 0px #ffffff inset;
  }
`;
export const Button = ({ children, onClick, type, w, h, p }) => {
  return (
    <StyledButton onClick={onClick} type={type} w={w} h={h} p={p}>
      {children}
    </StyledButton>
  );
};
