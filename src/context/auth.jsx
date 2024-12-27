import React, { createContext, useState, useContext } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    false || localStorage.getItem("token")
  );
  const [onLoginPage, setOnloginPage] = useState(true);
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const onlogin = () => setOnloginPage(true);
  const onSignUp = () => setOnloginPage(false);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, onlogin, onSignUp, onLoginPage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
