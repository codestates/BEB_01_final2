import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { VERIFIER } from "../../utils/function/openLogin";

function LogIn({ SetUser, openlogin, SetPrivKey }) {
  const [ID, SetID] = useState(false);
  const [password, SetPassword] = useState(false);

  const IdChange = (e) => {
    SetID(e.target.value);
  };
  const passwordChange = (e) => {
    SetPassword(e.target.value);
  };
  const Login = async () => {
    if (ID === false || password === false) {
      alert("정확한 값을 입력해 주세요!!");
    } else {
      await axios
        .post("http://localhost:8080/Login", {
          ID: ID,
          password: password,
        })
        .then((result) => {
          if ((result.data.message = "로그인 성공!")) {
            window.localStorage.setItem(
              "User",
              JSON.stringify(result.data.Token)
            );
            window.location.replace("http://localhost:3000");
          } else {
            alert("재 로그인 부탁..ㅠ");
          }
        });
    }
  };

  const onLoginGoogle = async () => {
    await openlogin.login({
      loginProvider: VERIFIER.loginProvider,
      redirectUrl: "http://localhost:3000/",
    });
    SetPrivKey(openlogin.privKey);
  };

  // const onLoginMetaMask = async () => {
  //   const accounts = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  //   console.log(accounts[0]);
  // };

  return (
    <div className="Login_box">
      <img src="./img/로그인 배경화면.jpeg" className="background_img" />
      <div className="Login_container">
        <div>아이디</div>
        <input type="text" onChange={IdChange} placeholder="Write Your ID" />
        <div> 패스워드</div>
        <input
          type="password"
          onChange={passwordChange}
          placeholder="Write Your Password"
        />
        <div className="login_button">
          <button onClick={Login}>로그인</button>

          <button className="Google_button" onClick={onLoginGoogle}>
            Google_Login
          </button>
          {/* <button className="Google_button" onClick={onLoginMetaMask}>
            Meta_Mask
          </button> */}
        </div>

        <Link to="/SignIn">
          <button className="signin">회원가입</button>
        </Link>
      </div>
    </div>
  );
}

export default LogIn;
