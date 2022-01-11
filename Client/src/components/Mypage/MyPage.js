import React from "react";
import "./MyPage.scss";

import { NFTList } from "../main";

function MyPage({ address, user }) {
  return (
    <>
      <div className="MyPage_App">
        <div className="Status_title">
          <h2>Welcome to Your Page</h2>
          <h2> You can See your Status and Equiment</h2>
          <h2> Enjoy Your Time</h2>
        </div>
        <div className="Status_Status">
          <div>아이디 : 룰루랄라</div>
          <div>주소 : 0xAea07E179dFC59dD118005A4A56768a51aD8F48b</div>
          <div>캐릭터이름 : 비숑은 커엽다</div>
          <div>PoW : 어쩃든 존나썜</div>
          <div>병력수 : 3000</div>
        </div>

        <div className="MyPage_Title">
          <img src="./img/MYpage.jpeg" alt="mypage" />
        </div>
      </div>
      <div className="Status_app">
        <div className="Status_container">
          <NFTList />
          <NFTList />
          <NFTList />
        </div>
      </div>
    </>
  );
}

export default MyPage;
