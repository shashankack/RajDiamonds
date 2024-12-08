import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  const [isAuthorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setAuthorized(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirect / to either /home or /login */}
        <Route
          path="/"
          element={
            isAuthorized ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={<Login setAuthorized={setAuthorized} />}
        />
        <Route
          path="/home"
          element={
            <PrivateRoute isAuthorized={isAuthorized}>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
