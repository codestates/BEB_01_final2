import React, { useState, useEffect } from "react";
import "./DetailWorld.scss";
import axios from "axios";

function DetailWorld({ player }) {
  const idx = useState(window.location.pathname.split(":")[1]);
  const [data, SetData] = useState(false);
  const [defense_owner, Set_Defense_owner] = useState(false);
  const [soldier, SetSoldier] = useState(false);
  const [data_ch, Set_Data_ch] = useState(false);

  const changeSoldier = async (e) => {
    SetSoldier(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`http://localhost:8080/Map/detail/${idx[0]}`)
        .then((result) => {
          SetData(result.data[0]);
          Set_Data_ch(true);
        });
    };

    const getCharacter_force = async () => {
      await axios
        .post("http://localhost:8080/Map/defense_owner", {
          address: data.owner,
        })
        .then((result) => {
          console.log(result);
          Set_Defense_owner(result.data.data);
        });
    };
    getData();
    if (data_ch !== false && data.owner !== "none") {
      getCharacter_force();
    }
  }, [data_ch]);

  const get = async () => {
    if (soldier === false) {
      alert("1명 이상의 병력으로 공격하세요!");
    } else if (data.owner === player.address) {
      alert("자기 자신을 공격할수는 없습니다");
    } else if (player === false) {
      alert("로그인 해주세요!");
      window.location.replace("http://localhost:3000/Login");
    } else {
      await axios
        .post("http://localhost:8080/Map/updateMap", {
          idx: idx[0],
          AttackAddress: player.address,
          soldier: soldier,
          owner: data.owner,
          defense_owner: defense_owner,
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
          {data.owner === "none" ? (
            <img
              src="https://www.wallpapertip.com/wmimgs/7-75917_zelda-wallpapers8-zelda-wallpaper-4k-desktop.jpg"
              className="img"
            />
          ) : (
            <img
              src="https://w.namu.la/s/e764cbd6426bff27978421f75aa3ebdabe3effe633b089a33def704e297a3dd6cb0305ebaa2a86bbc90921343c64ba852afb8dc4aa2f09a70a4f6664f25ac51dd241679bde05297f84f96c1a3a0ac0c6"
              className="img"
            />
          )}

          <div className="detail_box">
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
                  defense Soldier : <span>{data.force}</span>
                </div>
                <div>
                  {defense_owner === false
                    ? ""
                    : "Character force : " + defense_owner.Pow}
                </div>
              </div>
            </div>
            <div className="state02">
              <h4>My Status</h4>
              <div> Soldier : {player.Soldier}</div>
              <div> PoW : {player.Pow}</div>
            </div>
            <div className="Attack_div">
              <input type="text" onChange={changeSoldier} />
              <button className="Attack_button" onClick={get}>
                Attack
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailWorld;
