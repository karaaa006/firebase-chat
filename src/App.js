import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import "./App.css";
import { Loader } from "./components/Reuseble/Loader";
import { AppRouter } from "./Routes/AppRouter";
import { Layout } from "./Routes/Layout.jsx";

const firebaseConfig = {
  apiKey: "AIzaSyDFo4d_1yamo0LdOSP4eqXxIcAZ3aAwexU",
  authDomain: "chat-4c13b.firebaseapp.com",
  projectId: "chat-4c13b",
  storageBucket: "chat-4c13b.appspot.com",
  messagingSenderId: "244604417531",
  appId: "1:244604417531:web:c1a9f53019925f56a8c75e",
  measurementId: "G-JQ6L6RKCH6",
};

export const Context = createContext(null);
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

function App() {
  const [currentChat, setCurrentChat] = useState("");
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loader />;

  return (
    <Context.Provider
      value={{
        auth,
        app,
        db,

        currentChat,
        setCurrentChat,
        mobileMenuIsOpen,
        setMobileMenuIsOpen,
      }}
    >
      <Layout>
        <AppRouter />
      </Layout>
    </Context.Provider>
  );
}

export default App;
