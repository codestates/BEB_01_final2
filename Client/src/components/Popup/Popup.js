import React from "react";
import "./Popup.scss";
import { Link } from "react-router-dom"; //이미지를 누르면 마이페이지로 가도록 설정할 생각입니다.
function Popup({ buttonPopup, rouletteItem, setButtonPopup }) {
  return rouletteItem && buttonPopup ? (
    <div className="popup">
      <div className="popup_inner">
        <button className="popup_button" onClick={() => setButtonPopup(false)}>
          X
        </button>
        <div className="popup_img_div">
          <img src={rouletteItem.src} alt="item" className="popup_img" />
        </div>
        <div className="popup_text">
          <div>
            <span>name</span> : {rouletteItem.name}
          </div>
          <div>
            <span>grade</span> : {rouletteItem.grade}
          </div>
          <div>
            <span>Pow</span> : {rouletteItem.pow}
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
