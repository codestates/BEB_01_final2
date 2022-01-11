import React, { useEffect, useState } from "react";
import "./CryptoWorld.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeShortAddress } from "../../utils/function/function";
function CryptoWorld() {
  const [data, SetData] = useState(false);
  console.log(makeShortAddress);
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
            {data.map((reuslt) => {
              return (
                <Link to={`/detail/:${reuslt.idx}`} key={reuslt.idx}>
                  <div className="Map_App">
                    <div className="Map_img">
                      <img src={reuslt.src} alt={reuslt.src} />
                    </div>
                    <div className="Map_Text">
                      <div className="Map_name">
                        <h4>mapName</h4> {reuslt.MapName}
                      </div>
                      <div className="Map_topography">
                        <h4>topography</h4> {reuslt.topography}
                      </div>
                      <div className="Map_Token">
                        <h4>Token</h4> {reuslt.GiveToken}
                      </div>
                      <div className="Map_Owner">
                        <h4>Owner</h4> {makeShortAddress(reuslt.owner)}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default CryptoWorld;
