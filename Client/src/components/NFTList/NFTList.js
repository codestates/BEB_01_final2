import React from "react";

import "./NFTList.scss";
function NFTList({ NFTData }) {
  console.log(NFTData);
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
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

export default NFTList;
