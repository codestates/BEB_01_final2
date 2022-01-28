import Web3 from "web3";
import dotenv from "dotenv";
dotenv.config();

import { Auction_abi, character_abi } from "./abi_total.js";
import { character_CA, auction_CA } from "./CA_total.js";
import { TokenDB } from "../models.js";

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
      gas: 5000000,
      data: method.goldmintAll(address, 10).encodeABI(),
    };
    const temp = await new TokenDB({ tx: tx, contract: "Character" });
    temp.save();
  });
};

export const mintToken = async (address, amount) => {
  CharacterContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: character_CA,
      gas: 5000000,
      data: method.goldMint(address, amount).encodeABI(),
    };
    const temp = await new TokenDB({ tx: tx, contract: "Character" });
    temp.save();
  });
};

export const makeCharacter = async (address) => {
  CharacterContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: character_CA,
      gas: 5000000,
      data: method.makeCharacter(address).encodeABI(),
    };
    const temp = await new TokenDB({ tx: tx, contract: "Character" });
    temp.save();
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
      gas: 5000000,
      data: method.NFTminting(address, img).encodeABI(),
    };
    const temp = await new TokenDB({ tx: tx, contract: "Character" });
    temp.save();
  });
};

export const UpPow = async (address, random) => {
  CharacterContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: character_CA,
      gas: 5000000,
      data: method.IncreasePow(address, random).encodeABI(),
    };
    const temp = await new TokenDB({ tx: tx, contract: "Character" });
    temp.save();
  });
};

export const UpLimit = async (address) => {
  CharacterContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: character_CA,
      gas: 5000000,
      data: method.IncreaseLimit(address).encodeABI(),
    };
    const temp = await new TokenDB({ tx: tx, contract: "Character" });
    temp.save();
  });
};

export const makeTrade = async (price, idx) => {
  AuctionContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: auction_CA,
      gas: 5000000,
      data: method.make_trade(price, idx).encodeABI(),
    };
    const temp = await new TokenDB({ tx: tx, contract: "Auction" });
    temp.save();
  });
};

export const Bidding = async (price, buyer, idx) => {
  AuctionContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: auction_CA,
      gas: 5000000,
      data: method.Bid(price, buyer, idx).encodeABI(),
    };
    const temp = await new TokenDB({ tx: tx, contract: "Auction" });
    temp.save();
  });
};

export const trade = async (idx) => {
  AuctionContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: auction_CA,
      gas: 5000000,
      data: method.trade(idx).encodeABI(),
    };
    const temp = await new TokenDB({ tx: tx, contract: "Auction" });
    temp.save();
  });
};

export const tradeOff = async (idx) => {
  AuctionContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: auction_CA,
      gas: 5000000,
      data: method.tradeOff(idx).encodeABI(),
    };
    const temp = await new TokenDB({ tx: tx, contract: "Auction" });
    temp.save();
  });
};

export const buyToken = async (address, ETH) => {
  CharacterContract().then(async (method) => {
    // Client에서 직접 트랜잭션에 서명하도록 바꾸었음
    // 이 함수는 사용하지 않음
    // let tx = {
    //   from: address,
    //   to: character_CA,
    //   gas: 500000,
    //   gaslimit: 1000000,
    //   data: method.buyTokens().encodeABI(),
    //   value: await web3.utils.toWei(ETH, "ether"),
    // };
    // await web3.eth.sendTransaction(tx);
  });
  return "hoijn";
};

export const Token_To_ETH = async (ETH, Token, address) => {
  const value = await web3.utils.toWei(ETH, "ether");
  // 굉장히 불안전하고 완성적이지 못한 진행 방향인거 같다.

  // 컨트랙트 딴애는 문제가 없지만
  // 내가 걱정하는 부분은 바로 블록체인에 기록되는 시간문제
  // 실제 기록되기 전에 처리가 될수 있기 떄문에
  // -> 어차피 후에 들어오는 값으로 메꾸기는 하지만...
  CharacterContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: character_CA,
      gas: 5000000,
      data: method.sellTokens(Token, address).encodeABI(),
      value: value,
    };
    await web3.eth.accounts
      .signTransaction(tx, process.env.Server_PrivateKey)
      .then(async (Tx) => {
        await web3.eth.sendSignedTransaction(Tx.rawTransaction, (err, hash) => {
          if (err) console.log(err);
          else {
            console.log(hash);
          }
        });
      });
  });
};
