import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthModule from "./components/AuthModule";
import UserLogin from "./components/AuthModule/UserLogin";
import UserSignup from "./components/AuthModule/UserSignup";
import Dashboard from "./components/Dashboard";
import "./styles/App.scss";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "sonner";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route
            path="/"
            element={
              <PrivateRoute passIf="loggedIn">
                <Navigate to="/dashboard" />
              </PrivateRoute>
            }
          />
          <Route
            path="/auth"
            element={
              <PrivateRoute passIf="loggedOut">
                <AuthModule />
              </PrivateRoute>
            }
          >
            <Route
              path="/auth/login"
              element={
                <PrivateRoute passIf="loggedOut">
                  <UserLogin />
                </PrivateRoute>
              }
            />
            <Route path="/auth/signup" element={<UserSignup />} />
            <Route path="/auth/" element={<Navigate to="/auth/login" />} />
          </Route>
          <Route path="/*" element={<>Page not found!</>} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute passIf="loggedIn">
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      <Toaster position="bottom-left" richColors />
    </>
  );
};

export default App;
