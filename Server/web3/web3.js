import Web3 from "web3";
import dotenv from "dotenv";
import { Token_abi } from "./abi,bytecode/Token_abi.js";
import { TokenDB } from "../models.js";
import { Character_abi } from "./abi,bytecode/Character.js";

dotenv.config();

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
      to: process.env.Token_CA,
      gas: 5000000,
      data: method.mintGoldAll(address, 10).encodeABI(),
    };

    console.log(method);
    // await web3.eth.accounts
    //   .signTransaction(tx, process.env.Server_PrivateKey)
    //   .then(async (Tx) => {
    //     await web3.eth.sendSignedTransaction(Tx.rawTransaction, (err, hash) => {
    //       if (err) console.log(err);
    //       else console.log(hash);
    //     });
    //     // const makeTokenDB = await new TokenDB({
    //     //   To_Array: address,
    //     //   hash: Tx.rawTransaction,
    //     // });
    //     // makeTokenDB.save();
    //   });
  });
  console.log("success");
};

export const mintAllToken = async (address) => {};
