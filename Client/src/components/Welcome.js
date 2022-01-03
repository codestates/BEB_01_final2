import React, { useState } from "react";
import "./Welcome.scss";
import Web3 from "web3";
import { shortenAddress } from "../utils/funtcion";
import { contractABI, contractAddress } from "../utils/constants";
function Welcome({ SetWeb3, SetAccount, Account, web3, SetData }) {
  const [address, SetAddress] = useState("");
  const [Amount, SetAmount] = useState("");
  const [Keyword, SetKeyword] = useState("");
  const [Message, SetMessage] = useState("");

  const getWeb3 = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = await new Web3(window.ethereum);
      SetWeb3(web3);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      SetAccount(accounts);

      const mycontract = await new web3.eth.Contract(
        contractABI,
        contractAddress
      );

      await mycontract.methods
        .getAllTransactions()
        .call()
        .then((result) => {
          SetData(result);
        });
    }
  };

  const ChangeAddress = (e) => {
    SetAddress(e.target.value);
  };
  const ChangeAmount = (e) => {
    SetAmount(e.target.value);
  };
  const ChangeKeyword = (e) => {
    SetKeyword(e.target.value);
  };
  const ChangeMessage = (e) => {
    SetMessage(e.target.value);
  };

  const sendTransaction = async () => {
    if (web3 === false) {
      alert("로그인 해주세요!");
    } else {
      const mycontract = await new web3.eth.Contract(
        contractABI,
        contractAddress
      );
      let tx = {
        from: Account[0],
        to: contractAddress,
        gas: 500000,
        data: mycontract.methods
          .addToBlockchain(address, Amount, Keyword, Message)
          .encodeABI(),
      };
      console.log("트랜잭션 전송중....");
      await web3.eth.sendTransaction(tx).then((trs, err) => {
        if (trs) {
          alert("트랜잭션 전송 성공!");
        } else {
          alert("오류...!!");
        }
      });
      console.log("트랜잭션 전송성공!!");
    }
  };
  return (
    <div className="Welcome_App">
      <div className="Welcome_one">
        <div className="Welcome_Title">
          <h1 className="Welcome_h1">
            Buy and sell <br></br>Trusted Crypto
          </h1>
          <div className="Welcome_explain">
            Explore the crypto world. buy and sell crypo coins easily. <br></br>
            Trusted cryptoon to be your crypto market partner
          </div>

          <button className="Welcome_title_button" onClick={getWeb3}>
            Let's get started
          </button>
        </div>
        <div className="Welcome_lists">
          <div className="Welcome_list">Reliability</div>
          <div className="Welcome_list">Security</div>
          <div className="Welcome_list">Ethereum</div>
          <div className="Welcome_list">Web 3.0</div>
          <div className="Welcome_list">Low fees</div>
          <div className="Welcome_list">BlockChain</div>
        </div>
      </div>
      <div className="Welcone_two">
        <div className="eth-card">
          <img src="./img/GRAYSCALE.png" alt="GRAYSCALE" />
          <div className="eth-card-account">
            {Account === false ? "Login Plz" : shortenAddress(Account)}
          </div>
          <p className="eth-card-Ethereum">Ethereum</p>
        </div>
        <div className="Welcome_form">
          <div className="Welcome_input">
            <input
              placeholder="Address To"
              value={address}
              onChange={ChangeAddress}
            />
            <input
              placeholder="Amount (ETH)"
              value={Amount}
              onChange={ChangeAmount}
            />
            <input
              placeholder="Keyword (Gif)"
              value={Keyword}
              onChange={ChangeKeyword}
            />
            <input
              placeholder="Enter Message"
              value={Message}
              onChange={ChangeMessage}
            />
          </div>
          <button onClick={sendTransaction}>Send now</button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
