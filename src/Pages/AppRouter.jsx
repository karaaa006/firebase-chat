import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../index.js";
import { LOGIN_ROUTE, MAIN_ROUTE } from "../utils/consts";
import { privateRoutes, publicRoutes } from "./Routes";
import { Loader } from "../components/Reuseble/Loader.js";

export const AppRouter = () => {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <Loader />;

  return user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route key="*" path="*" element={<Navigate to={MAIN_ROUTE} replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route key="*" path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
    </Routes>
  );
};
