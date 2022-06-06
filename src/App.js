import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { Context } from "./index.js";
import "./App.css";
import { Loader } from "./components/Reuseble/Loader";
import { AppRouter } from "./Routes/AppRouter";
import { Layout } from "./Routes/Layout.jsx";

function App() {
  const { auth } = useContext(Context);
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loader />;

  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
}

export default App;
