import { randomNum } from "../functions/randomNumber.js";
import { ItemDB, UserDB } from "../models.js";
import { CharacterContract, getNFTLIst, mintNFT } from "../web3/web3.js";

export const getAllItem = async (req, res) => {
  const ItemList = await ItemDB.find({});
  res.status(200).send(ItemList);
};

export const roulette = async (req, res) => {
  const Number = req.body.random;
  const Address = req.body.address;
  let grade;
  if (Number < 10) {
    grade = "A";
  } else if (10 <= Number <= 30) {
    grade = "B";
  } else {
    grade = "C";
  }

  const item = await ItemDB.find({ grade: grade });
  const User = await UserDB.findOne({ address: Address });

  const randomItem = item[randomNum(0, item.length - 1)];
  // NFT로 만든다.
  if (grade === "A") {
    randomItem.pow = randomNum(50, 80);
  } else if (grade === "B") {
    randomItem.pow = randomNum(30, 40);
  } else {
    randomItem.pow = randomNum(10, 20);
  }

  await UserDB.findOneAndUpdate(
    { address: Address },
    {
      Token: User.Token - 20,
      NFTList: [...User.NFTList, randomItem],
    },
    {
      new: true,
    }
  );
  let ITEM = JSON.stringify(randomItem);
  mintNFT(Address, ITEM);
  res.status(200).send(randomItem);
};

export const getItem_NFT = async (req, res) => {
  const address = req.body.address;
  if (address !== undefined) {
    const User = await UserDB.findOne({ address: address });
    res.status(200).send(User.NFTList);
  }
};
