import { CharacetrDB, UserDB } from "../models.js";
import { MakeRandomNumber_Using_web3, UpLimit, UpPow } from "../web3/web3.js";

export const oneCharacter = async (req, res) => {
  const title = req.body.title;
  const address = req.body.address;
  const User = await CharacetrDB.findOne({
    address: address,
  });
  const check = await UserDB.findOne({ address: address });
  if (title === "Pow") {
    if (check.Token < 50) {
      res.status(200).send({ message: "Token부족..." });
    } else {
      const random_number = await MakeRandomNumber_Using_web3();

      await CharacetrDB.findOneAndUpdate(
        { address: address },
        {
          Pow: User.Pow + Number(random_number),
        },
        { new: true }
      );
      await UserDB.findOneAndUpdate(
        {
          address: address,
        },
        { Token: check.Token - 50 },
        { new: true }
      );
      // UpPow(address, random_number);
      res.status(200).send({ message: "Pow_Upgrade" });
    }
  } else {
    if (check.Token < 100) {
      res.status(200).send({ message: "Token부족..." });
    } else {
      const answer = await CharacetrDB.findOneAndUpdate(
        { address: address },
        {
          limit: User.limit + 300,
        },
        {
          new: true,
        }
      );
      await UserDB.findOneAndUpdate(
        {
          address: address,
        },
        { Token: check.Token - 100 },
        { new: true }
      );
      // UpLimit(address);
      res.status(200).send({ message: "limit_Upgrade" });
    }
  }
};

export const AllCharacter = async (req, res) => {
  console.log("AllCharacter");
};
