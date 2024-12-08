import { Route, Routes as RRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { isAuthenticated } from "./utils/auth";

const Routes = () => {
  return (
    <RRoutes>
      <Route path="/" element={{ isAuthenticated } ? <Home /> : <Login />} />
      <Route path="/login" element={<Login />} />
    </RRoutes>
  );
};

export default Routes;
