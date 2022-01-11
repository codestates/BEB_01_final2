import { UserDB } from "../models.js";
import { CharacterDB } from "../models.js";
import { web3 } from "../web3/web3.js";

import jwt from "jsonwebtoken";

const { ACCESS_SECRET } = process.env;

export const makeUser = async (req, res) => {
  const ID = req.body.ID;
  const password = req.body.password;

  const IdCh = await UserDB.find({ ID: ID });

  if (IdCh.length !== 0) {
    res.status(200).send({ message: "아이디 중복!" });
  } else {
    const answer = web3();
    answer.then(async (web3) => {
      const account = await web3.eth.accounts.create();

      const makeUser = await new UserDB({
        ID: ID,
        password: password,
        address: account.address,
        privateKey: account.privateKey,
      });
      makeUser.save();

      // 컨트랙트를 통해서 캐릭터를 바로 만들어 주어야함
      res.status(200).send({
        message: "아이디 생성 완료!",
        User: makeUser,
      });
    });
  }
};

export const AllUser = async (req, res) => {
  const all = await UserDB.find();
  res.status(200).send({ message: "all user", data: all });
};

export const Login = async (req, res) => {
  const ID = req.body.ID;
  const password = req.body.password;
  const ch = await UserDB.find({ ID: ID, password: password });
  if (ch.length === 0) {
    res.status(200).send({ message: "로그인 실패.." });
  } else {
    const accessToken = await jwt.sign({ ID: ID }, ACCESS_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({ message: "로그인 성공!", Token: accessToken });
  }
};

export const vefiry = async (req, res) => {
  let temp = req.headers.authorization.split(" ")[0];
  let answer = "";
  for (let i = 1; i < temp.length - 1; i++) {
    answer += temp[i];
  }
  let data = jwt.verify(answer, ACCESS_SECRET);

  const User = await UserDB.findOne({ ID: data.ID });
  const sendData = {
    address: User.address,
    HavingLands: User.HavingLands,
  };

  res.status(200).send(sendData);
};

export const vefiry_google = async (req, res) => {
  const ch = await UserDB.findOne({ address: req.body.address });
  if (ch === null) {
    const User = await new UserDB({ address: req.body.address });
    User.save();

    // 컨트랙트를 통해서 캐릭터를 만들어 주어야함
    res.status(200).send({ message: "new Character", data: User });
  } else {
    res.status(200).send({ message: "already User", data: ch });
  }
};
