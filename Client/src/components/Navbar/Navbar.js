import React from "react";
import "./Navbar.scss";

import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="Navbar_app">
      <div className="Navbar_title">
        <Link to="/">
          <img src="./img/logo.png" alt="logo" />
        </Link>
      </div>
      Your Token : 3
      <ul className="Navbar_ul">
        <Link to="/MyPage">
          <li>My Room</li>
        </Link>
        <Link to="/SignIn">
          <li>SignIn</li>
        </Link>
        <Link to="/CryptoWorld">
          <li>Crypto World</li>
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
