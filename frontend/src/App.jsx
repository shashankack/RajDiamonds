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
import theme from "./assets/theme";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const [isAuthorized, setAuthorized] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#bb86fc' : '#1976d2',
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setAuthorized(!!token);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header onToggleDarkMode={toggleDarkMode} darkMode={darkMode} />
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
    </ThemeProvider>
  );
};

export default App;
