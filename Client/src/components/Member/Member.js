import React from "react";
import "./Member.scss";
function Member() {
  return (
    <div className="Member_app">
      <h2 className="member_h2">Team Member</h2>
      <div className="member_container">
        <div className="member_title">
          <h3 className="member_position">
            Position : <span className="position_detail">팀장 [유호진]</span>
          </h3>
          <div className="member_text">
            <span>Back_end</span> : 전부 담당
            <p>
              <span>Front_end</span> : Homepage, Crypto_World, MyPage,
              Map_Detail, OpenLogin 및 React
            </p>
            <span>Solidity</span> : ERC20,721 보완, Character작성, Acution보완
          </div>
          <img src="./img/member/team_1.jpeg" alt="team_1" />
        </div>
        <div className="member_title">
          <h3 className="member_position">
            Position : <span className="position_detail">팀원 [이형기]</span>
          </h3>
          <div className="member_text">
            <span>Solidity</span> : ERC-20,721,Auction 담당하여 작성
          </div>
          <img src="./img/member/team_2.jpeg" alt="team_2" />
        </div>
        <div className="member_title">
          <h3 className="member_position">
            Position : <span className="position_detail">팀원 [임우철]</span>
          </h3>
          <div className="member_text">
            {" "}
            <span>Front_end</span> : Shop페이지, Random함수 관여
          </div>
          <img src="./img/member/team_3.jpeg" alt="team_3" />
        </div>
        <div className="member_title">
          <h3 className="member_position">
            Position : <span className="position_detail">팀원 [장현서]</span>
          </h3>
          <div className="member_text">
            <span>Front_end</span> : Login, SignIn 페이지 작성
          </div>
          <img src="./img/member/team_4.jpeg" alt="team_4" />
        </div>
      </div>
    </div>
  );
}

export default Member;
