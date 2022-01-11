import { UserDB } from "../models.js";
import { CharacterDB } from "../models.js";
import { web3 } from "../web3/web3.js";

import jwt from "jsonwebtoken";

const { ACCESS_SECRET } = process.env;

export const makeUser = async (req, res) => {
  const ID = req.body.ID;
  const password = req.body.password;
  const CharacterName = req.body.CharacterName;

  const IdCh = await UserDB.find({ ID: ID });
  const CharacterCh = await UserDB.find({ CharacterName: CharacterName });

  if (IdCh.length !== 0) {
    res.status(200).send({ message: "아이디 중복!" });
  } else {
    if (CharacterCh.length === 0) {
      console.log("sdfsd");
      const answer = web3();
      answer.then(async (web3) => {
        const account = await web3.eth.accounts.create();

        const makeUser = await new UserDB({
          ID: ID,
          password: password,
          address: account.address,
          privateKey: account.privateKey,
          CharacterName: CharacterName,
        });
        makeUser.save();

        const makeCharacter = await new CharacterDB({
          CharacterName: CharacterName,
        });
        makeCharacter.save();

        res.status(200).send({
          message: "아이디 생성 완료!",
          User: makeUser,
          Character: makeCharacter,
        });
      });
    } else {
      res.status(200).send({ message: "캐릭터 이름 중복!" });
    }
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
