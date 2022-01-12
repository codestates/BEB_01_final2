import React from "react";
import "./MyPage.scss";

import { NFTList } from "../main";

function MyPage({ player }) {
  console.log(player);
  return (
    <>
      <div className="MyPage_App">
        <div className="Status_title">
          <h2>Welcome to Your Page</h2>
          <h2> You can See your Status and Equiment</h2>
          <h2> Enjoy Your Time</h2>
        </div>
        <div className="Status_Status">
          <div>주소 : {player.address}</div>
          <div>PoW : solidity로 가져와야함;;</div>
          <div>병력수 : {player.Soldier}</div>
          <div>Token : {player.Token}</div>
        </div>
      </div>
      <div className="Status_app">
        <div className="Status_container">
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
          <NFTList />
        </div>
      </div>
    </>
  );
}

export default MyPage;
