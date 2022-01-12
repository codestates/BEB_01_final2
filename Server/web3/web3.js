import Web3 from "web3";
import dotenv from "dotenv";
import { Token_abi } from "./Token_abi.js";

dotenv.config();

export const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.infuraURL)
);

export const TokenContract = async () => {
  const Contract = await new web3.eth.Contract(Token_abi, process.env.Token_CA);
  return Contract.methods;
};

export const CharacterContract = async () => {};

export const mintToken = async (address) => {};

export const mintAllToken = async (address) => {};
