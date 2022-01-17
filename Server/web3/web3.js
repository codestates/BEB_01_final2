import Web3 from "web3";
import dotenv from "dotenv";
dotenv.config();
import { Token_abi } from "./abi,bytecode/Token_abi.js";
import { Character_abi } from "./abi,bytecode/Character.js";
import { nonce } from "../app.js";
import { deposit_TokenDB } from "../functions/TokenDB.js";

export const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.infuraURL)
);

export const TokenContract = async () => {
  const Contract = await new web3.eth.Contract(Token_abi, process.env.Token_CA);
  return Contract.methods;
};

export const CharacterContract = async () => {
  const Contract = await new web3.eth.Contract(
    Character_abi,
    process.env.Character_CA
  );
  return Contract.methods;
};

export const mintTokenArray = async (address) => {
  CharacterContract().then(async (method) => {
    let tx = {
      from: process.env.Server_Address,
      to: process.env.Character_CA,
      nonce: nonce,
      gas: 500000,
      data: method.mintAll(address, 10).encodeABI(),
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
    console.log(method);
    let tx = {
      from: process.env.Server_Address,
      to: process.env.Character_CA,
      nonce: nonce,
      gas: 500000,
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
      to: process.env.Character_CA,
      nonce: nonce,
      gas: 500000,
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
      to: process.env.Character_CA,
      nonce: nonce,
      gas: 500000,
      data: method.mintNFT(address, img).encodeABI(),
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
      to: process.env.Character_CA,
      nonce: nonce,
      gas: 500000,
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
      to: process.env.Character_CA,
      nonce: nonce,
      gas: 500000,
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

export const getNFTLIst = async (address) => {
  await CharacterContract().then(async (method) => {
    let NFTList = [];

    const length = await method.getTotalNFTAmount().call();

    for (let i = 1; i <= length; i++) {
      if ((await method.ownerOf(i).call()) === address) {
        NFTList.push(await method.getNFT(i).call());
      }
    }

    return NFTList;
  });
};
