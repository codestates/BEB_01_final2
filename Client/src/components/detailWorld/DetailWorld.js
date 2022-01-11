import React, { useState, useEffect } from "react";
import "./DetailWorld.scss";
import axios from "axios";
function DetailWorld() {
  const idx = useState(window.location.pathname.split(":")[1]);
  const [data, SetData] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`http://localhost:8080/Map/detail/${idx[0]}`)
        .then((result) => SetData(result.data[0]));
    };
    getData();
  }, []);

  // 이거 img는 서버 로딩창이에요
  // 그냥 데이터를 불러오는데에 시간이 걸리기 떄문에 그시간동안 로딩창 보여주려고 적어놓았으니

  // 작성하기 이해가 안되시면 일단 냅둬주세요 제가 후에 작성해 볼게요!

  // 화이팅!

  //   <img
  //             className="Loading"
  //             src="https://t1.daumcdn.net/cfile/tistory/233F6D505786DA870A"
  //             alt="loading"
  //           />

  const get = async () => {
    await axios.post("http://localhost:8080/Map/updateMap", {
      idx: idx[0],
      AttackAddress: "aaaaa",
    });
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
          {console.log(data)}
          <div className="detail_box">
            <div className="detail_title">
              <label>MAP</label>
            </div>
            <div className="detail_content">
              <img src={data.src} alt="logo" />
            </div>
            <div className="detail_state">
              <div className="state01">
                <label>
                  MAP : <span>{data.MapName}</span>
                </label>
                <label>
                  topography : <span>{data.topography}</span>
                </label>
                <label>
                  GiveToken : <span>{data.GiveToken}</span>
                </label>
                <label>
                  Owner : <span>{data.owner}</span>
                </label>
                <label>
                  defense force : <span>{data.force}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailWorld;
