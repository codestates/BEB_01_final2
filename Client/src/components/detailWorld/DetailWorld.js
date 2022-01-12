import React, { useState, useEffect } from "react";
import "./DetailWorld.scss";
import axios from "axios";
function DetailWorld({ player }) {
  const idx = useState(window.location.pathname.split(":")[1]);
  const [data, SetData] = useState(false);
  const [soldier, SetSoldier] = useState(false);

  const changeSoldier = async (e) => {
    SetSoldier(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`http://localhost:8080/Map/detail/${idx[0]}`)
        .then((result) => SetData(result.data[0]));
    };
    getData();
  }, []);

  const get = async () => {
    if (soldier === false) {
      alert("1명 이상의 병력으로 공격하세요!");
    } else if (data.owner === player.address) {
      alert("자기 자신을 공격할수는 없습니다");
    } else if (player === false) {
      alert("로그인 해주세요!");
    } else {
      await axios
        .post("http://localhost:8080/Map/updateMap", {
          idx: idx[0],
          AttackAddress: player.address,
          soldier: soldier,
          owner: data.owner,
        })
        .then((result) => {
          alert(result.data.message);
          window.location.reload();
        });
    }
  };

  return (
    <>
      {data === false ? (
        <img
          className="Loading"
          src="https://t1.daumcdn.net/cfile/tistory/233F6D505786DA870A"
          alt="loading"
        />
      ) : (
        <div className="detail_wrap">
          <div className="detail_box">
            <div className="detail_title">
              <label>MAP</label>
            </div>
            {/* <div className="detail_content">
              <img src="" alt="logo" />
            </div> */}
            <div className="detail_state">
              <div className="state01">
                <div>
                  MAP : <span>{data.MapName}</span>
                </div>
                <div>
                  topography : <span>{data.topography}</span>
                </div>
                <div>
                  GiveToken : <span>{data.GiveToken}</span>
                </div>
                <div>
                  Owner : <span>{data.owner}</span>
                </div>
                <div>
                  Soldier force : <span>{data.force}</span>
                </div>
                <div>
                  Character force : <span>여기는 web3로 불러와야 할듯</span>
                </div>
              </div>
              <div className="Attack_div">
                <input type="text" onChange={changeSoldier} />
                <button className="Attack_button" onClick={get}>
                  Attack
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailWorld;
