import styled from "styled-components";

const Wrap = styled.div`
  width: ${({ w }) => w || "auto"};

  background-color: #f0f0f3;
  box-shadow: 1.5px 1.5px 3px 0px #aeaec066, -1px -1px 3px 0px #ffffff;
`;

const StyledInput = styled.input`
  display: block;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;

  width: 100%;
  height: 100%;

  outline: none;
  background-color: #eeeeee;
  box-shadow: 1px 1px 2px 0px #aeaec033 inset, -1px -1px 1px 0px #ffffffb2 inset;
`;

export const Input = ({ value, setValue, placeholder, w }) => {
  return (
    <Wrap w={w}>
      <StyledInput
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
    </Wrap>
  );
};
