import Web3 from "web3";
import dotenv from "dotenv";
dotenv.config();
import { nonce } from "../app.js";
import {
  deposit_TokenDB,
  deposit_TokenDB_No_address,
} from "../functions/TokenDB.js";

import { Auction_abi, character_abi } from "./abi_total.js";
import { character_CA, auction_CA } from "./CA_total.js";

export const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.infuraURL)
);

export const CharacterContract = async () => {
  const Contract = await new web3.eth.Contract(character_abi, character_CA);
  return Contract.methods;
};

export const AuctionContract = async () => {
  const Contract = await new web3.eth.Contract(Auction_abi, auction_CA);
  return Contract.methods;
};

export const mintTokenArray = async (address) => {
  CharacterContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: character_CA,
      nonce: nonce,
      gas: 500000,
      gaslimit: 1000000,
      data: method.goldmintAll(address, 10).encodeABI(),
    };
    await web3.eth.accounts
      .signTransaction(tx, process.env.Server_PrivateKey)
      .then(async (Tx) => {
        deposit_TokenDB(Tx, address);
      });
    console.log("DB : mint_All실행!!");
  });
};

export const mintToken = async (address, amount) => {
  CharacterContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: character_CA,
      nonce: nonce,
      gas: 500000,
      gaslimit: 1000000,
      data: method.goldMint(address, amount).encodeABI(),
    };
    await web3.eth.accounts
      .signTransaction(tx, process.env.Server_PrivateKey)
      .then(async (Tx) => {
        deposit_TokenDB(Tx, address);
      });
    console.log("DB : mint_token실행!");
  });
};

export const makeCharacter = async (address) => {
  CharacterContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: character_CA,
      nonce: nonce,
      gas: 500000,
      gaslimit: 1000000,
      data: method.makeCharacter(address).encodeABI(),
    };
    await web3.eth.accounts
      .signTransaction(tx, process.env.Server_PrivateKey)
      .then(async (Tx) => {
        deposit_TokenDB(Tx, address);
      });
    console.log("DB : block 캐릭터 생성 완료!");
  });
};

export const MakeRandomNumber_Using_web3 = async () => {
  return CharacterContract().then(async (method) => {
    const randeom = await method.getStatus().call();
    // 토큰의 총 양에 따라서 랜덤한 숫자가 달라지기 떄문에 계속해서 똑같은 숫자가 나오게 된다
    // -- 이 부분은 토큰의 총 양이 고정일떄만 이런 현상이 발생
    // 하지만 토큰은 계속 유동적으로 바뀌기 떄문에 난수가 생성될 것이다.
    return randeom;
  });
};

export const mintNFT = async (address, img) => {
  CharacterContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: character_CA,
      nonce: nonce,
      gas: 500000,
      gaslimit: 1000000,
      data: method.NFTminting(address, img).encodeABI(),
    };
    await web3.eth.accounts
      .signTransaction(tx, process.env.Server_PrivateKey)
      .then(async (Tx) => {
        deposit_TokenDB(Tx, address);
      });

    console.log("DB : block NFT 생성 완료!");
  });
};

export const UpPow = async (address, random) => {
  CharacterContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: character_CA,
      nonce: nonce,
      gas: 500000,
      gaslimit: 1000000,
      data: method.IncreasePow(address, random).encodeABI(),
    };
    await web3.eth.accounts
      .signTransaction(tx, process.env.Server_PrivateKey)
      .then(async (Tx) => {
        deposit_TokenDB(Tx, address);
      });
    console.log("DB : UpPow");
  });
};

export const UpLimit = async (address) => {
  CharacterContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: character_CA,
      nonce: nonce,
      gas: 500000,
      gaslimit: 1000000,
      data: method.IncreaseLimit(address).encodeABI(),
    };
    await web3.eth.accounts
      .signTransaction(tx, process.env.Server_PrivateKey)
      .then(async (Tx) => {
        deposit_TokenDB(Tx, address);
      });
    console.log("DB : UpLimit");
  });
};

export const makeTrade = async (price, idx) => {
  AuctionContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: auction_CA,
      nonce: nonce,
      gas: 500000,
      gaslimit: 1000000,
      data: method.make_trade(price, idx).encodeABI(),
    };
    await web3.eth.accounts
      .signTransaction(tx, process.env.Server_PrivateKey)
      .then(async (Tx) => {
        deposit_TokenDB_No_address(Tx);
      });
    console.log("DB : making Trade!!");
  });
};

export const Bidding = async (price, buyer, idx) => {
  AuctionContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: auction_CA,
      nonce: nonce,
      gas: 500000,
      gaslimit: 1000000,
      data: method.Bid(price, buyer, idx).encodeABI(),
    };
    await web3.eth.accounts
      .signTransaction(tx, process.env.Server_PrivateKey)
      .then(async (Tx) => {
        deposit_TokenDB(Tx, buyer);
      });
    console.log("DB : Bidding!!!");
  });
};

export const trade = async (idx) => {
  AuctionContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: auction_CA,
      nonce: nonce,
      gas: 500000,
      gaslimit: 1000000,
      data: method.trade(idx).encodeABI(),
    };
    await web3.eth.accounts
      .signTransaction(tx, process.env.Server_PrivateKey)
      .then(async (Tx) => {
        deposit_TokenDB_No_address(Tx);
      });
    console.log("DB : Trade!");
  });
};

export const tradeOff = async (idx) => {
  AuctionContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: auction_CA,
      nonce: nonce,
      gas: 500000,
      gaslimit: 1000000,
      data: method.tradeOff(idx).encodeABI(),
    };
    await web3.eth.accounts
      .signTransaction(tx, process.env.Server_PrivateKey)
      .then(async (Tx) => {
        deposit_TokenDB_No_address(Tx);
      });
    console.log("DB : Trade_Off");
  });
};

export const buyToken = async (address, ETH) => {
  CharacterContract().then(async (method) => {
    let tx = {
      from: address,
      to: character_CA,
      gas: 500000,
      gaslimit: 1000000,
      data: method.buyTokens().encodeABI(),
      value: await web3.utils.toWei(ETH, "ether"),
    };
    await web3.eth.sendTransaction(tx);
  });
  return "hoijn";
};
