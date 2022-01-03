import React, { useState } from "react";
import "./Welcome.scss";
import Web3 from "web3";
import { shortenAddress } from "../utils/funtcion";
function Welcome({ SetWeb3, SetAccount, Account }) {
  const [address, SetAddress] = useState("");
  const [Amount, SetAmount] = useState("");
  const [Keyword, SetKeyword] = useState("");
  const [Message, SetMessage] = useState("");

  const getWeb3 = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3 = new Web3(window.ethereum);
        SetWeb3(web3);
      } catch (error) {
        console.error(error);
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      SetAccount(accounts);
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

  const sendTransaction = async () => {};
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
