import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ItemList.scss";
function ItemList() {
  const [data, SetData] = useState(false);

  useEffect(() => {
    const getItemData = async () => {
      await axios
        .get("http://localhost:8080/Item/getAllItem")
        .then((reuslt) => {
          SetData(reuslt.data);
        });
    };
    getItemData();
  }, []);

  console.log(data);
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
            {data.map((reuslt, idx) => {
              console.log(reuslt);
              return (
                <div className="Map_App" key={idx}>
                  <div className="Map_img">
                    <img src={reuslt.src} alt={reuslt.src} />
                  </div>
                  <div className="Map_Text">
                    <div className="Map_name">
                      <h4>Index</h4> {reuslt.id}
                    </div>

                    <div className="Map_name">
                      <h4>Name</h4> {reuslt.name}
                    </div>

                    <div className="Map_topography">
                      <h4>Grade</h4> {reuslt.grade}
                    </div>
                    <div className="Map_Token">
                      <h4>Pow</h4>{" "}
                      {reuslt.grade === "C"
                        ? "10~20"
                        : reuslt.grade === "B"
                        ? "30~40"
                        : reuslt.grade === "A"
                        ? "50~80"
                        : "null"}
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
export default ItemList;
