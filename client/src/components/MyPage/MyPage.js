import React, { useState } from 'react';
import "./MyPage.scss";
import { Link } from 'react-router-dom';

import Web3 from 'web3';
import erc20Abi from '../../abi/erc20Abi';



function MyPage() {
  
  const [account, setAccount] = useState();
  const [inputValue, setInputValue] = useState();
  const [erc20TokenAddr, setErc20TokenAddr] = useState();
  const [sendToAddr, setSendToAddr] = useState();
  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    console.log(window.ethereum);
    setAccount(accounts[0]);
  };

  const generateToken = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(erc20Abi, inputValue);
    setErc20TokenAddr(inputValue);
    setInputValue('');
    console.log(contract.methods);
    const tokenSymbol = await contract.methods.symbol().call();

    const tokenDecimals = 18;
    const tokenImage =
      'https://images.unsplash.com/photo-1582573732277-c5444fa37391?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2187&q=80';

    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: erc20TokenAddr,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });
      console.log(wasAdded);

      if (wasAdded) {
        console.log('토큰 생성!');
      } else {
        console.log('실패!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  //0xEB1f0b20ddc161557f78748193c8a9713e65D496
  const sendErc20Token = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = await new web3.eth.Contract(erc20Abi, erc20TokenAddr);
    console.log(await contract.methods.balanceOf(account).call());
    const tokenDecimals = web3.utils.toBN(18);
    const tokenAmountToTransfer = web3.utils.toBN(10000);
    const calculatedTransferValue = web3.utils.toHex(
      tokenAmountToTransfer.mul(web3.utils.toBN(10).pow(tokenDecimals))
    );
    // const checkValiable = await contract.methods
    //   .transferFrom(account, sendToAddr, calculatedTransferValue)
    //   .call();
    // console.log(checkValiable);
    if (sendToAddr) {
      await contract.methods
        .transfer(sendToAddr, calculatedTransferValue)
        .send({ from: account })
        .on('transactionHash', (hash) => {
          console.log(hash);
          setSendToAddr('');
        });
    }
  };



  return (
    
    <div className="MyPage_App">
        <div className="MyPage_one">
          <div className="MyPage_Title">
            <h1 className="MyPage_h1">
              '문명' 아니고 '운명'<br></br> 
            </h1>

            <div className="MyPage_explain">
            MyPage
            </div>

      <div>
      {account ? (
        <div >
          
          <p >나의 계정주소:   {account}</p>
          

          <p>My Erc20 Token Address:  {erc20TokenAddr}</p>
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              } } />

            <button className="MyPage_title_button2" onClick={generateToken}> 내가 보낼 '아이템의 주소'</button>

          </div>
          <div className="MyPage_title_text">
            <input
              type="text"
              value={sendToAddr}
              onChange={(e) => {
                setSendToAddr(e.target.value);
              } } />

            <button className="MyPage_title_button3" onClick={sendErc20Token}>
              상대방이 아이템을 '받을 주소'
            </button>

          </div>
        </div>
      ) : (
        <button className="MyPage_title_button" onClick={connectWallet}>Connect With My Wallet</button>
      )}
    </div>
            

          </div>

          <div className="MyPage_lists">

          </div>
        </div>




        <div className="MyPageChar_App">

          <Link to="/MyPage">
            <div className="MyPageChar_Img">
              <img src="./img/궁수.gif" alt="궁수" />
            </div>
          </Link>
          <div className="MyPageChar_form">

            <div className="MyPageChar_name">이름 : 설날 떡국 냠냠 </div>

            <div className="MyPageChar_address">
              나의 계정주소 : {account}
            </div>

            <div className="MyPageChar_level">레벨 : 100</div>
            <div className="MyPageChar_attack">공격력 : 1004</div>
            <div className="MyPageChar_sol">병력 : 300</div>
            <div className="MyPageChar_land">소유한 땅 : 77</div>

          </div>

        </div>


      </div>
    
  );
};


export default MyPage;
