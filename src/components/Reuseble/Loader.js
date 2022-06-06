import { Oval } from "react-loader-spinner";
import styled from "styled-components";

const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;

export const Loader = () => {
  return (
    <LoaderWrap>
      <Oval
        ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={10}
        strokeWidthSecondary={10}
        color="tomato"
        secondaryColor="transparent"
      />
    </LoaderWrap>
  );
};
