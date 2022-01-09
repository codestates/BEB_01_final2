import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

import { ethers } from "ethers";
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

  return (
    <div className="Login_box">
      <div className="Login_container">
        <div>아이디</div>
        <input type="text" onChange={IdChange} placeholder="Write Your ID" />
        <div> 패스워드</div>
        <input
          type="password"
          onChange={passwordChange}
          placeholder="Write Your Password"
        />
        <button onClick={Login}>로그인</button>

        <button className="Google_button" onClick={onLoginGoogle}>
          Google_Login
        </button>

        <Link to="/SignIn">
          <button className="signin">아이디가 없으신가요..??</button>
        </Link>
      </div>
    </div>
  );
}

export default LogIn;
