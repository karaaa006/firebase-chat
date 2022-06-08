import styled from "styled-components";
import { Button } from "./Button";

const StyledButton = styled(Button)``;

export const IconButton = ({ icon, onClick }) => {
  return <StyledButton onClick={onClick}>{icon}</StyledButton>;
};
