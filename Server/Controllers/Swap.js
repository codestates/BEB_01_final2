import { buyToken } from "../web3/web3.js";

export const eth_Token = async (req, res) => {
  const address = req.body.address;
  const ETH = req.body.eth;

  const result = await buyToken(address, ETH);

  console.log(result);
};

export const Token_eth = async (req, res) => {
  console.log("Toekn_eth");
};
