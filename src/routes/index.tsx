import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./app.routes";
import { AuthRouter } from "./auth.routes";

export function AppRoutes() {
  const login = true;
  const routes = login ? <AppRouter /> : <AuthRouter />;
  return <BrowserRouter>{routes}</BrowserRouter>;
}
