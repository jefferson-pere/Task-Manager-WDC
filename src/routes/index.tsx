import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppRouter } from "./app.routes";
import { AuthRouter } from "./auth.routes";

export function AppRoutes() {
  const { authUserID } = useAuth();
  const routes = authUserID ? <AppRouter /> : <AuthRouter />;
  return <BrowserRouter>{routes}</BrowserRouter>;
}
