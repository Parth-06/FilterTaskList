import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { state } = useContext(UserContext);
  const navigate = useNavigate();
  const HeaderMain = () => {
    if (state) {
      return (
        <div className="Navbar">
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>Home</li>
          </Link>
          <Link to="/logouts" style={{ textDecoration: "none" }}>
            <li style={{ color: "rgb(30, 13, 109)" }}>Logout</li>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="Navbar">
          <li
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </li>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <li style={{ color: "rgb(30, 13, 109)" }}>Login</li>
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="head">
      FilterTask App
      <HeaderMain />
    </div>
  );
};

export default Header;
