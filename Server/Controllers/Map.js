import { giveTokenDB } from "../functions/giveToken.js";
import { MapDB, TokenDB, UserDB } from "../models.js";
import { TokenContract, web3 } from "../web3/web3.js";
import dotenv from "dotenv";
dotenv.config();

export const AllMap = async (req, res) => {
  const answer = await MapDB.find();

  res.status(200).send(answer);
};

export const detailMap = async (req, res) => {
  const idx = req.params.id;

  const answer = await MapDB.find({ idx: idx });
  res.status(200).send(answer);
};

export const updateMap = async (req, res) => {
  const idx = req.body.idx;
  const AttackAddress = req.body.AttackAddress;
  const soldier = req.body.soldier;
  const beforeOwner = req.body.owner;
  const temp = await MapDB.findOne({ idx: idx });

  if (beforeOwner === "none") {
    const answer = await MapDB.findOneAndUpdate(
      { idx: idx },
      { owner: AttackAddress, force: soldier },
      { new: true }
    );
    const user = await UserDB.findOne({ address: AttackAddress });
    const answer2 = await UserDB.findOneAndUpdate(
      { address: AttackAddress },
      {
        Soldier: user.Soldier - soldier,
        HavingLands: [...user.HavingLands, temp.MapName],
      },
      { new: true }
    );
    res.status(200).send({ message: "주인이 없는 땅이기에 바로 차지합니다!" });
  } else {
    console.log("주인이 있는 땅을 의미");
    const beforeSoldier = temp.force;
    // 기존 병력은 불러왔고
    // 그러면 기존 병력과 주인의 캐릭터 수치를 합쳐서

    // 들어오는 값과 비교를 하여 승부를 결정 짓으면 됨
    const beforeOwner = await UserDB.findOne({ address: beforeOwner });

    // 주인이 있을시에 처리해야하는 로직을 작성해야함
    // solidity코드를 통해서 character부분도 불러와야 하기 떄문에 후에 작성
  }
};

export const GiveToken = async (req, res) => {
  const map = await MapDB.find({});
  let answer = [];
  for (let i = 0; i < map.length; i++) {
    if (map[i].owner !== "none") {
      answer.push(map[i].owner);
    }
  }

  if (answer.length > 0) {
    for (let i = 0; i < answer.length; i++) {
      giveTokenDB(answer[i]);
    }

    TokenContract().then(async (method) => {
      let nonce = await web3.eth.getTransactionCount(
        process.env.Server_Address
      );
      console.log(nonce);
      // let tx = {
      //   from: process.env.Server_Address,
      //   to: process.env.Token_CA,
      //   nonce: nonce,
      //   gas: 500000,
      //   data: method.goldMintAll(answer, 20).encodeABI(),
      // };
      // await web3.eth.accounts
      //   .signTransaction(tx, process.env.Server_PrivateKey)
      //   .then(async (Tx) => {
      //     const makeTokenDB = await new TokenDB({
      //       To_Array: answer,
      //       hash: Tx.rawTransaction,
      //     });
      //     makeTokenDB.save();
      // });
    });
    console.log("TokenDB update");
    res.status(200).send({ message: "Token지급 완료!" });
  } else {
    res.status(200).send({ message: "점령한 사람이 없습니다..ㅠ" });
  }
};
