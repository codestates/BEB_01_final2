import React from "react";
import "./Shop.scss";
import { Popup } from "../main";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Shop({ player }) {
  console.log(player);
  const generator = async () => {
    if (player.Token >= 20) {
      const randomNum = Math.floor(Math.random() * 100 + 1);

      await axios
        .post("http://localhost:8080/Item/roulette", {
          address: player.address,
          random: randomNum,
        })
        .then((result) => {
          console.log(result);
        });
    } else {
      alert("Token이 부족합니다!!");
    }
  };

  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div className="Shop_App">
      <div className="Shop_one">
        <div className="Shop_Title">
          <h1 className="Shop_h1">
            Welcome to the shop<br></br>
          </h1>
          <div className="Shop_explain">
            Draw the items you want to draw & become strong on the battlefield.{" "}
            <br></br>$ Event $ Class A Chance Increase!
          </div>

          <div className="Shop_App">
            <div className="Shop_Img">
              <img src="./img/집행검.jpg" alt="뽑기" />
            </div>

            <div className="Shop_form"></div>
          </div>

          <button className="Shop_title_button " onClick={generator}>
            Item draw
          </button>
          <div className="Draw_Item_popup">
            <button
              className="Shop_title_button "
              onClick={generator}
              onClick={() => setButtonPopup(true)}
            >
              Show My Item
            </button>

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <div>
                <h3>My Legendary Item</h3>
              </div>
            </Popup>
          </div>
        </div>
        <div className="Shop_lists">
          <div className="Shop_list"> Token recharge</div>

          <div className="Shop_list">Item probability table</div>
          <Link to="/ItemList">
            <div className="Shop_list">Item list</div>
          </Link>

          <Link to="/MyPage">
            <div className="Shop_list">My Item</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Shop;

//====================================================

// window.open =
// function pop() {

//     function onClick() {
//         document.querySelector('.modal_wrap').style.display ='block';
//         document.querySelector('.black_bg').style.display ='block';
//     }
//     function offClick() {
//         document.querySelector('.modal_wrap').style.display ='none';
//         document.querySelector('.black_bg').style.display ='none';
//     }

//     document.getElementById('modal_btn').addEventListener('click', onClick);
//     document.querySelector('.modal_close').addEventListener('click', offClick);

//     return(

//     <div>
//         <button type='button' id="modal_btn">모달창아 나와랏</button>

//         <div class="black_bg"></div><div class="modal_wrap">
//             <div class="modal_close"><a href="#">close</a></div>

//             <div>
//             모달창 내용
//             </div>

//         </div>
//     </div>

//         );
//     };
