import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App";

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
// emoji user ID
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      auth,
      app,
      db,
    }}
  >
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Context.Provider>
);
