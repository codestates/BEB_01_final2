import React, { useState } from "react";
import { Selling } from "../main";

import "./NFTList.scss";
function NFTList({ NFTData, player }) {
  const [sell, SetSell] = useState(false);
  const [want_nft, Set_Want_nft] = useState(false);

  return (
    <>
      {NFTData === false ? (
        ""
      ) : (
        <>
          {NFTData.map((NFT, idx) => {
            return (
              <div className="NFTList" key={idx}>
                <div className="NFTList_app">
                  <div className="NFT_img">
                    <img src={NFT.src} />
                  </div>
                  <div className="NFT_name">{NFT.name}</div>
                  <div className="NFT_grade">등급 : {NFT.grade}</div>
                  <div className="NFT_pow">pow : {NFT.pow}</div>
                  <button
                    className="NFT_sell"
                    onClick={() => {
                      SetSell(true);
                      Set_Want_nft(NFT);
                    }}
                  >
                    판매하기
                  </button>
                </div>
              </div>
            );
          })}
          {sell === false ? (
            ""
          ) : (
            <Selling want_nft={want_nft} SetSell={SetSell} player={player} />
          )}
        </>
      )}
    </>
  );
}

export default NFTList;
