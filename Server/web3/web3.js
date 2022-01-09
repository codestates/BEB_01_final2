import Web3 from "web3";
import dotenv from "dotenv";

dotenv.config();

export const web3 = async () => {
  const web3 = await new Web3(
    new Web3.providers.HttpProvider(process.env.infuraURL)
  );
  return web3;
};
