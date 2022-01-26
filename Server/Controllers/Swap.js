import { CharacetrDB, UserDB } from "../models.js";
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
  console.log("Toekn_eth");
};
