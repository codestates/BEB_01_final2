import axios from "axios";
import React, { useState } from "react";
import "./SignIn.css";
function SignIn() {
  const [name, SetName] = useState("");
  const [password, SetPassword] = useState("");
  const [ch, SetCh] = useState("");
  const [Character, SetCharacter] = useState("");

  const NameChange = (e) => {
    SetName(e.target.value);
  };
  const CharacterChange = (e) => {
    SetCharacter(e.target.value);
  };

  const PasswordChange = (e) => {
    SetPassword(e.target.value);
  };

  const PasswordCh = (e) => {
    SetCh(e.target.value);
  };
  const sendData = async () => {
    if (password !== ch) {
      alert("패스워드가 다릅니다!");
    } else {
      await axios
        .post("http://localhost:8080/makeuser", {
          ID: name,
          password: password,
          CharacterName: Character,
        })
        .then((result) => {
          alert(result.data.message);
        });
    }
  };

  return (
    <div className="SignIn_app">
      <div className="SignIn_container">
        <div className="SignIn_title">Make Your Account</div>
        <div>아이디</div>
        <input type="text" onChange={NameChange} placeholder="Name_input" />
        <div>캐릭터 이름</div>
        <input
          type="text"
          onChange={CharacterChange}
          placeholder="Character_input"
        />
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
        <button onClick={sendData}>제출!</button>
      </div>
    </div>
  );
}

export default SignIn;
