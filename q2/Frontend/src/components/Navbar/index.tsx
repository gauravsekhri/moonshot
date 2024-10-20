import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth-token"]);

  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("auth-token");
  };

  return (
    <>
      <div className="navbar_cont">
        <div className="logo_text">Moonshot</div>
        <div className="logout_btn" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </>
  );
};

export default Navbar;
