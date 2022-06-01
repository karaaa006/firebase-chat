import { Oval } from "react-loader-spinner";

export const Loader = () => {
  return (
    <Oval
      ariaLabel="loading-indicator"
      height={100}
      width={100}
      strokeWidth={10}
      strokeWidthSecondary={10}
      color="tomato"
      secondaryColor="transparent"
    />
  );
};
