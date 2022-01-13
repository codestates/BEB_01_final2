import axios from "axios";
import React, { useState } from "react";
import "./SignIn.css";
function SignIn() {
  const [name, SetName] = useState("");
  const [password, SetPassword] = useState("");
  const [ch, SetCh] = useState("");

  const NameChange = (e) => {
    SetName(e.target.value);
  };

  const PasswordChange = (e) => {
    SetPassword(e.target.value);
  };

  const PasswordCh = (e) => {
    SetCh(e.target.value);
  };
  const sendData = async () => {
    if (name.length !== 0 && password.length !== 0 && ch.length !== 0) {
      if (password !== ch) {
        alert("패스워드가 다릅니다!");
      } else {
        await axios
          .post("http://localhost:8080/makeuser", {
            ID: name,
            password: password,
          })
          .then((result) => {
            alert(result.data.message);
            window.location.replace("http://localhost:3000/Login");
          });
      }
    } else {
      alert("값을 확인해 주세요!");
    }
  };

  return (
    <div className="SignIn_app">
      <img src="./img/로그인 배경화면.jpeg" className="background_img" />
      <div className="SignIn_container">
        <div>아이디</div>
        <input type="text" onChange={NameChange} placeholder="Name_input" />
        <div>패스워드</div>
        <input
          type="password"
          onChange={PasswordChange}
          placeholder="Password"
        />
        <div>패스워드 확인</div>
        <input
          type="password"
          onChange={PasswordCh}
          placeholder="Password_ch"
        />
        <button onClick={sendData}>회원가입</button>
      </div>
    </div>
  );
}

export default SignIn;
