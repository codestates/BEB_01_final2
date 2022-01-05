import React, { useEffect, useState } from "react";
import "./CryptoWorld.scss";
import axios from "axios";
function CryptoWorld() {
  const [data, SetData] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:8080/Map/AllMap")
        .then((a) => SetData(a.data));
    };
    getData();
  }, []);
  return (
    <div className="World_App">
      <div className="Map_container">
        {data === false ? (
          <img
            className="Loading"
            src="https://t1.daumcdn.net/cfile/tistory/233F6D505786DA870A"
            alt="loading"
          />
        ) : (
          <>
            {data[0].owner.map((reuslt, idx) => {
              return (
                <div className="Map_App" key={idx}>
                  <div className="Map_img">
                    <img src={data[0].src[idx]} alt={data[0].src[idx]} />
                  </div>
                  <div className="Map_Text">
                    <div className="Map_name">
                      <h4>mapName</h4> {data[0].MapName[idx]}
                    </div>
                    <div className="Map_topography">
                      <h4>topography</h4> {data[0].topography[idx]}
                    </div>
                    <div className="Map_Token">
                      <h4>Token</h4> {data[0].GiveToken[idx]}
                    </div>
                    <div className="Map_Owner">
                      <h4>Owner</h4> {data[0].owner[idx]}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default CryptoWorld;
