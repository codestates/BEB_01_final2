import React, { useState } from "react";
import "./Selling.scss";
import axios from "axios";
function Selling({ want_nft, SetSell, player }) {
  const [selling_Amount, Set_selling_Amount] = useState(false);

  const selling = async () => {
    if (selling_Amount !== false) {
      await axios
        .post("http://localhost:8080/SellingItem/makeSell", {
          item: want_nft,
          price: selling_Amount,
          owner: player,
        })
        .then((result) => {
          alert(result.data.message);
          window.location.replace("http://localhost:3000/Deal");
        });
    } else {
      alert("금액을 입력해 주세요...");
    }
  };

  return (
    <div className="Selling_App">
      <div className="Selling_container">
        <div className="Selling_box">
          <div className="Selling_img">
            <img src={want_nft.src} alt={want_nft.src} />
          </div>
          <div className="Selling_text">
            <div>
              <span>name</span> : {want_nft.name}
            </div>
            <div>
              <span>Pow</span> : {want_nft.pow}
            </div>
            <div>
              <span>Grade</span> : {want_nft.grade}
            </div>
            <div>
              <span>id</span> : {want_nft.id}
            </div>
          </div>
        </div>
        <div className="Selling_button">
          <div className="Selling_input">
            <span>판매 금액</span>
            <input
              type="text"
              onChange={(e) => {
                Set_selling_Amount(e.target.value);
              }}
            />
          </div>
          <button onClick={selling}>판매</button>
          <button
            onClick={() => {
              SetSell(false);
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default Selling;
