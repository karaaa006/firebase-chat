import { LOGIN_ROUTE, MAIN_ROUTE } from "../utils/consts";
import { LoginPage } from "./LoginPage";
import { MainPage } from "./MainPage";

export const publicRoutes = [{ path: LOGIN_ROUTE, Component: LoginPage }];

export const privateRoutes = [{ path: MAIN_ROUTE, Component: MainPage }];
