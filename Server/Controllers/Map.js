import { giveTokenDB } from "../functions/giveToken.js";
import { CharacetrDB, MapDB, TokenDB, UserDB } from "../models.js";
import {
  MakeRandomNumber_Using_web3,
  mintToken,
  mintTokenArray,
} from "../web3/web3.js";
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
  const defense_owner = req.body.defense_owner;
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
    const defense_Character = await CharacetrDB.findOne({
      address: beforeOwner,
    });
    const Attacker_Character = await CharacetrDB.findOne({
      address: AttackAddress,
    });
    const Attacker_User = await UserDB.findOne({ address: AttackAddress });

    const defense_User = await UserDB.findOne({ address: beforeOwner });

    const random_number = (await MakeRandomNumber_Using_web3()) / 10;

    const Want_Attack_Soldier = req.body.soldier;

    const Map_defense_force = defense_Character.Pow * random_number;
    const Map_defense_Soldier = temp.force;

    const Attacker_Pow = Attacker_Character.Pow * random_number;
    const Attacker_having_Soldier = Attacker_User.Soldier;

    if (Want_Attack_Soldier > Attacker_having_Soldier) {
      res.status(200).send({ message: "그만큼의 병력이 없습니다...ㅠ" });
    }

    const total_Attack_Power = Attacker_Pow * Want_Attack_Soldier;
    const total_defense_Power = Map_defense_force * Map_defense_Soldier;

    if (total_Attack_Power >= total_defense_Power) {
      // 공격자가 이겼다는 의미
      // 공격자 DB업데이트
      const Attacker_update = await UserDB.findOneAndUpdate(
        { address: AttackAddress },
        {
          Soldier: Attacker_User.Soldier - Want_Attack_Soldier,
          HavingLands: [...Attacker_User.HavingLands, temp.MapName],
          Token: Attacker_User.Token + temp.GiveToken,
        },
        {
          new: true,
        }
      );
      const Map_update = await MapDB.findOneAndUpdate(
        { idx: idx },
        { owner: AttackAddress, force: Want_Attack_Soldier },
        { new: true }
      );
      mintToken(AttackAddress, temp.GiveToken);
      res.status(200).send({ message: "공격자 승리!!!!" });
    } else {
      // 수비자가 이겼다는 의미
      const Attacker_update = await UserDB.findOneAndUpdate(
        { address: AttackAddress },
        {
          Soldier: Attacker_User.Soldier - Want_Attack_Soldier,
        },
        {
          new: true,
        }
      );
      const defense_update = await UserDB.findOneAndUpdate(
        { address: beforeOwner },
        {
          Token: defense_User + temp.GiveToken,
        },
        { new: true }
      );
      mintToken(beforeOwner, temp.GiveToken);
      res.status(200).send({ message: "방어자 승리!!!!" });
    }
    // 캐릭터 pow에 소수점에 부여되는 random_number을 곱한뒤
    // 해당 값을 병력에 곱하여 서로 비교를 한다.
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
    mintTokenArray(answer);

    console.log("TokenDB update");
    res.status(200).send({ message: "Token지급 완료!" });
  } else {
    res.status(200).send({ message: "점령한 사람이 없습니다..ㅠ" });
  }
};

export const defense_owner = async (req, res) => {
  const address = req.body.address;
  const defense_Character = await CharacetrDB.findOne({ address: address });
  res.status(200).send({ data: defense_Character });
};
