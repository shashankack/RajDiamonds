import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./utils/PrivateRoute";
import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const [isAuthorized, setAuthorized] = useState(
    !!localStorage.getItem("access_token") // Initialize from localStorage
  );
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", darkMode ? "dark" : "light");
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#bb86fc" : "#1976d2",
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = () => {
    setAuthorized(true);
    localStorage.setItem("access_token", "your_token_here"); // Set token after login
  };

  const handleLogout = () => {
    setAuthorized(false);
    localStorage.removeItem("access_token"); // Remove token on logout
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header
          onToggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          onLogout={handleLogout}
        />
        <Routes>
          {/* Redirect / to either /home or /login */}
          <Route
            path="/"
            element={
              isAuthorized ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={<Login setAuthorized={handleLogin} />}
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
    </ThemeProvider>
  );
};

export default App;
