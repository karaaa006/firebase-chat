import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../index.js";
import { GoogleAuthButton } from "./GoogleAuthButton";

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 500px;
  height: 350px;
  max-width: 100%;
  max-height: 100%;

  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
`;

const Title = styled.h1`
  margin: 0 0 30px 0;

  font-size: 32px;

  color: rgba(0, 0, 100, 0.7);
`;

export const LoginForm = () => {
  const provider = new GoogleAuthProvider();
  const { auth } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const credential = await signInWithPopup(auth, provider);
      console.log(credential);
      const userRef = doc(getFirestore(), "users", credential.user.uid);

      await setDoc(
        userRef,
        {
          name: credential.user.displayName,
          photo: credential.user.photoURL,
          email: credential.user.email,
        },
        { merge: true }
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <StyledForm>
      <Title>LightChat</Title>
      <GoogleAuthButton onClick={handleLogin} />
    </StyledForm>
  );
};
