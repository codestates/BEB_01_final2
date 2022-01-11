import React from "react";
import "./Shop.scss";
import { Link } from "react-router-dom";


let generateNum = document.querySelector(".countNumber");
// let button1 = document.querySelector(".Shop_title_button");

function Shop() {


  const generator = () => {
    
    const randomNum = Math.floor(Math.random() * 100 + 1);
    //Math.random 0~1 사이의 난수 생성
    //Math.floor 소수점을 내림시켜 정수로 만듦
    generateNum = randomNum;
  
    // button1.addEventListener("click", generator);
    
    
    console.log(randomNum);
    console.log(generateNum );


    if (randomNum<10) {
      alert("A 등급 당첨!");
    }
    else if (randomNum>=10 & randomNum<40){
      alert("B 등급 당첨");
    }
    else {
      alert("C 등급 당첨.");
    }

      // 결과를 표시할 element
      const resultElement = document.getElementById('result');
        
      // 현재 화면에 표시된 값
      let number = resultElement.innerText;

        // 결과 출력
        resultElement.innerText = number;






  };


  return (
    <div className="Shop_App">
      <div className="Shop_one">
        <div className="Shop_Title">
          <h1 className="Shop_h1">
            Welcome to the shop<br></br> 
          </h1>
          <div className="Shop_explain">
            Draw the items you want to draw & become strong on the battlefield. <br></br>
            $ Event $  Class A Chance Increase!
          </div>

          <div className="Shop_App">
            <div className="Shop_Img">
            <img src="./img/집행검.jpg" alt="뽑기" />
            </div>

            <div className="Shop_form"></div>
          </div>

{/* 
          <div class="countBox">
            <h1>1~10 랜덤 뽑기</h1>
            <p class="countNumber">0</p>
            <div class="countButtonWrap">
                <button class="generate">뽑기</button>
            </div>
          </div> */}

            <div class="countNumber" id='result'></div>

            <button className="Shop_title_button " 
            onClick={generator} 
            > Item draw </button>


        </div>
        <div className="Shop_lists">
          
          <div className="Shop_list"> Token recharge</div>

          <div className="Shop_list" >Item probability table</div>

          <div className="Shop_list" >Item list</div>

          <Link to="/MyPage">
          <div className="Shop_list">My Item</div>
          </Link>



          
          
        </div>
      </div>

      
    </div>
  );
}

export default Shop;


