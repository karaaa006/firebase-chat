import { getAuth, signOut } from "firebase/auth";

export const MainPage = () => {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <>
      MainPage
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};
