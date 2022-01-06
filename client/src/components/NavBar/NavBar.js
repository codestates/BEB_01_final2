import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="NavBar_app">
      <Link to="/">
        <div className="NavBar_title">
          <img src="./img/logo.png" alt="logo" />
        </div>
      </Link>

      <div>
        <ul className="NavBar_ul">
          <Link to="/MyPage" className="menu-item">
            <li>My Page</li>
          </Link>

          <Link to="/CryptoWorld" className="menu-item">
            <li>Crypto World</li>
          </Link>

          <Link to="/Login" className="menu-item">
            <li>Login</li>
          </Link>

          <Link to="/Shop" className="menu-item">
            <li>Shop</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
