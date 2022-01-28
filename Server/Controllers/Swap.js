import { CharacetrDB, UserDB } from "../models.js";
import { Token_To_ETH } from "../web3/web3.js";
export const eth_Token = async (req, res) => {
  const address = req.body.address;
  const Token = req.body.Token;

  const account = await UserDB.findOne({ address: address });

  await UserDB.findOneAndUpdate(
    { address: address },
    {
      Token: account.Token + Token,
    },
    { new: true }
  );

  res.status(200).send({ message: "Token Swap!" });
};

export const Token_eth = async (req, res) => {
  const ETH = req.body.eth;
  const Token = req.body.Token;
  const address = req.body.address;

  Token_To_ETH(ETH, Token, address);
};
