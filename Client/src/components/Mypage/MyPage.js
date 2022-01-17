import React, { useEffect, useState } from "react";
import "./MyPage.scss";

import { NFTList } from "../main";
import axios from "axios";

function MyPage({ player, NFTData, SetNFTData }) {
  const getNFTList = async () => {
    if (player !== undefined) {
      await axios
        .post("http://localhost:8080/Item/getItem_NFT", {
          address: player.address,
        })
        .then((result) => {
          SetNFTData(result.data);
        });
    }
  };

  const upgrade = async (title) => {
    await axios
      .post("http://localhost:8080/Character/oneCharacter", {
        title: title,
        address: player.address,
      })
      .then((result) => {
        alert(result.data.message);
        window.location.reload();
      });
  };

  useEffect(() => {
    if (player !== undefined) {
      getNFTList();
    }
  }, [player]);

  return (
    <>
      {player === false ? (
        <div className="Login_box">
          <img src="./img/Login.png" className="Login_img" />
        </div>
      ) : (
        <>
          <div className="MyPage_App">
            <div className="Status_title">
              <h2>Welcome to Your Page</h2>
              <h2> You can See your Status and Equiment</h2>
              <h2> Enjoy Your Time</h2>
            </div>
            <div className="Status_Status">
              <div>주소 : {player.address}</div>
              <div>PoW : {player.Pow}</div>
              <div>병력수 : {player.Soldier}</div>
              <div>병력제한 : {player.limit}</div>
              <div>Token : {player.Token}</div>
              <div>
                소유한 땅 :
                {player.HavingLands.map((a, idx) => {
                  return <span key={idx}>{a}, </span>;
                })}
              </div>
              <div className="Character_up">
                <div className="Up_pow">
                  <button
                    onClick={() => {
                      upgrade("Pow");
                    }}
                  >
                    Upgrade Pow
                  </button>
                  <div className="Up_Pow_div">50 Token</div>
                </div>
                <div className="Up_Limit">
                  <button
                    onClick={() => {
                      upgrade("limit");
                    }}
                  >
                    Upgrade Limit
                  </button>{" "}
                  <div className="Up_Limit_div">100 Token</div>
                </div>
              </div>
            </div>
          </div>
          <div className="Status_app">
            <div className="Status_container">
              <NFTList NFTData={NFTData} player={player} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MyPage;
