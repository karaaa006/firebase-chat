import styled from "styled-components";
import { GoogleLogo } from "../Reuseble/svgs/GoogleLogo";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1rem;
  padding: 26px 19px;
  border: none;
  border-radius: 5px;

  font-weight: 600;
  font-size: 18px;
  line-height: 1;

  color: rgba(0, 0, 0, 0.54);
  background-color: #ffffff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.17),
    0px 0px 2px 0px rgba(0, 0, 0, 0.08);

  cursor: pointer;

  transition: box-shadow 150ms ease, background-color 150ms ease;

  :hover,
  :focus {
    box-shadow: 0px 0px 15px 0px rgba(66, 133, 244, 0.7);
  }

  :active {
    background-color: #eeeeee;

    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.17),
      0px 0px 2px 0px rgba(0, 0, 0, 0.08);
  }

  :disabled {
    opacity: 0.5;
  }
`;

export const GoogleAuthButton = ({ onClick, disabled }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      <GoogleLogo />
      Sign in with Google
    </StyledButton>
  );
};
