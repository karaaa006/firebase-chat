import "./App.css";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFo4d_1yamo0LdOSP4eqXxIcAZ3aAwexU",
  authDomain: "chat-4c13b.firebaseapp.com",
  projectId: "chat-4c13b",
  storageBucket: "chat-4c13b.appspot.com",
  messagingSenderId: "244604417531",
  appId: "1:244604417531:web:c1a9f53019925f56a8c75e",
  measurementId: "G-JQ6L6RKCH6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

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
}

export default App;
