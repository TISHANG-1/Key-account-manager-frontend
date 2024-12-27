import React, { useState } from "react";
import {
  Navbar,
  NavLeft,
  NavRight,
  NavButton,
  Profile,
  AppName,
} from "./styles.jsx";
import { useAuth } from "../../context/auth.jsx";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // State for user login status
  const navigate = useNavigate();
  const { isLoggedIn, logout, onlogin, onSignUp } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/");
  };
  const handleSignup = () => {
    onSignUp();
  };
  const handleLogin = () => {
    onlogin();
  };
  return (
    <Navbar>
      <NavLeft>
        {!isLoggedIn ? (
          <div>
            <NavButton onClick={handleLogin}> Login</NavButton>
            <NavButton onClick={handleSignup}>Sign Up</NavButton>
          </div>
        ) : (
          <div>
            <Profile>My Profile</Profile>
            <NavButton onClick={handleLogout}>Logout</NavButton>
          </div>
        )}
      </NavLeft>
      <NavRight>
        <AppName>Key Account Manager App</AppName>
      </NavRight>
    </Navbar>
  );
};

export default Header;
