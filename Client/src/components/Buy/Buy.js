import axios from "axios";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./Buy.scss";
import Swal from "sweetalert2";

import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function Buy({ player, contract, CA }) {
  const [eth, SetEth] = useState(0);
  const [Token, SetToken] = useState(0);
  const [eth_to_token, Set_eth_to_token] = useState(true);

  const [balance_Token, Set_balance_Token] = useState(0);
  const [balance_Eth, Set_blance_Eth] = useState(0);

  const changeState = () => {
    Set_eth_to_token(!eth_to_token);
    SetEth(0);
    SetToken(0);
  };

  const change_balance = (Token_name, e) => {
    if (Token_name === "token") {
      SetToken(e.target.value);
      SetEth((e.target.value / 100000000).toFixed(8));
    } else {
      SetEth(e.target.value);
      SetToken(e.target.value * 100000000);
    }
  };

  const getUser_balance = async () => {
    if (player !== false) {
      await axios
        .post("http://localhost:8080/swap", {
          address: player.address,
        })
        .then((result) => {
          Set_balance_Token(result.data.Token);
          Set_blance_Eth(result.data.Eth);
        });
    }
  };

  const send_swap = async () => {
    if (eth_to_token === true) {
      if (balance_Eth >= eth && eth > 0) {
        const web3 = await new Web3(window.ethereum);
        const value = await web3.utils.toWei(eth, "ether");
        console.log(value);
        let tx = {
          from: player.address,
          to: CA,
          gas: 5000000,
          data: contract.methods.buyTokens().encodeABI(),
          value: value,
        };

        alert_function(player.address);
        await web3.eth.sendTransaction(tx).then(async (trs, err) => {
          if (!err) console.log(trs);
          else {
            console.log(trs);
          }
        });
        await axios
          .post("http://localhost:8080/Swap/eth_Token", {
            Token: Token,
            address: player.address,
          })
          .then((result) => {
            if (result.data.message === "Token Swap!") {
              success_alert();
            }
          });
      } else {
        alert("이더가 없습니다.");
      }
    } else {
      if (balance_Token >= Token && Token > 0) {
        // await axios.post("http://localhost:8080/Swap/Token_eth", {
        //   eth: eth,
        //   Token: Token,
        //   address: player.address,
        // });
      } else {
        alert("토큰이 부족합니다..");
      }
    }
  };

  const alert_function = (from) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: true,
      timer: 5000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: "success",
      title: "Transaction_Sucess!! plz Waiting a minute!",
      text: from,
    });
  };

  const success_alert = () => {
    MySwal.fire({
      icon: "success",
      title: "Transaction",
      text: "Swapping Success!!",
    });
  };

  useEffect(() => {
    getUser_balance();
  }, [player]);
  return (
    <div className="Buy_App">
      <div className="Buy_container">
        <div className="Buy_layout">
          <div className="Buy_title">
            <div onClick={changeState} className="change_button">
              {eth_to_token ? "ETH -> Token" : "Token -> ETH"}
            </div>
            <div>Eth To Token!!</div>
          </div>
          {eth_to_token ? (
            <>
              <input
                type="number"
                className="Buy_eth"
                placeholder="eth.."
                onChange={(e) => change_balance("eth", e)}
                value={eth === 0 ? "eth..." : eth}
              />
              <input
                type="number"
                className="Buy_eth"
                placeholder="Gold.."
                onChange={(e) => change_balance("token", e)}
                value={Token === 0 ? "Gold..." : Token}
              />
            </>
          ) : (
            <>
              <input
                type="number"
                className="Buy_eth"
                placeholder="Gold.."
                onChange={(e) => change_balance("token", e)}
                value={Token === 0 ? "Gold..." : Token}
              />{" "}
              <input
                type="number"
                className="Buy_eth"
                placeholder="eth.."
                onChange={(e) => change_balance("eth", e)}
                value={eth === 0 ? "eth..." : eth}
              />{" "}
            </>
          )}

          <button className="Buy_button" onClick={send_swap}>
            스왑!
          </button>
          <div>1ETH = 100000000 Token</div>
        </div>
        <div className="balance">Your_balance_eth : {balance_Eth} </div>
        <div className="balance">Your_balance_Token : {balance_Token} </div>
        <div className="balance">Your_address : {player.address} </div>
      </div>
    </div>
  );
}

export default Buy;
