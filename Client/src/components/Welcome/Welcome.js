import React from "react";
// import { makeShortAddress } from "../../utils/function/function";

import "./Welcome.scss";

import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="Welcome_App">
      <div className="Welcome_one">
        <div className="Welcome_Title">
          <h1 className="Welcome_h1">
            Play & Earn<br></br> on Trusted Crypto
          </h1>
          <div className="Welcome_explain">
            Explore the crypto world. Play and Earn in Crypto World <br></br>
            BlockChain will lead You!! Just join and Play!
          </div>
          <Link to="/MyPage">
            <button className="Welcome_title_button">Let's get started</button>
          </Link>
        </div>
        <div className="Welcome_lists">
          <div className="Welcome_list">Reliability</div>
          <div className="Welcome_list">Security</div>
          <div className="Welcome_list">Ethereum</div>
          <div className="Welcome_list">Web 3.0</div>
          <div className="Welcome_list">Low fees</div>
          <div className="Welcome_list">BlockChain</div>
        </div>
      </div>

      <div className="Char_App">
        <div className="Char_Img">
          <img src="./img/전사.gif" alt="전사" />
        </div>

        <div className="Char_form"></div>
      </div>
    </div>
  );
}

export default Welcome;
