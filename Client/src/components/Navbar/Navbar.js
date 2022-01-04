import React from "react";
import "./Navbar.scss";

function Navbar() {
  return (
    <div className="Navbar_app">
      <div className="Navbar_title">
        <img src="./img/logo.png" alt="logo" />
      </div>
      <ul className="Navbar_ul">
        <li>My Room</li>
        <li>SignIn</li>
        <li>Crypto World</li>
      </ul>
    </div>
  );
}

export default Navbar;
