import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const LoginPage = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  console.log(auth);
  const handleLogin = async () => {
    const credential = await signInWithPopup(auth, provider);

    console.log(credential);
  };

  return (
    <>
      <h1>app</h1>
      <button onClick={handleLogin}>login</button>
    </>
  );
};
