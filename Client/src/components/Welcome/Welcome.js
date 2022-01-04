import React from "react";
// import { makeShortAddress } from "../../utils/function/function";

import "./Welcome.scss";

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
          <button className="Welcome_title_button">Let's get started</button>
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
        <div className="Char_form">
          <div className="Char_name">이름 : ㄴ아린ㅇ란라</div>
          <div className="Char_address">
            계정주소 :
            {/* {makeShortAddress("0xaea07e179dfc59dd118005a4a56768a51ad8f48b")} */}
          </div>
          <div className="Char_level">레벨 : 1</div>
          <div className="Char_attack">공격력 : 1</div>
          <div className="Char_sol">병력 : 1</div>
          <div className="Char_land">소유한 땅 : 1</div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
