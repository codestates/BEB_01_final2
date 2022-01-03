import React from "react";
import "./Navbar.scss";

function Navbar() {
  return (
    <div className="Navbar_app">
      <div className="Navbar_title">
        <img src="./img/logo.png" alt="logo" />
      </div>

      <ul className="Navbar_ul">
        <li>Market</li>
        <li>Exchange</li>
        <li>Tutorials</li>
        <li>Wallet</li>
        <button>Login</button>
      </ul>
    </div>
  );
}

export default Navbar;
