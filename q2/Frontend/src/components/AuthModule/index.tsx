import React from "react";
import { Outlet } from "react-router-dom";

const AuthModule = () => {
  return (
    <>
      <div className="auth_main_cont">
        <div className="form_cont">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthModule;
