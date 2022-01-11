import { MapDB, UserDB } from "../models.js";

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
  const temp = await MapDB.findOne({ idx: idx });

  if (temp.owner === "none") {
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
    // 주인이 있을시에 처리해야하는 로직을 작성해야함
    // solidity코드를 통해서 character부분도 불러와야 하기 떄문에 후에 작성
  }
};

export const GiveToken = async (req, res) => {
  console.log(new Date().toLocaleTimeString() + "데이터 들어옴");

  const map = await MapDB.find({});
  let answer = [];
  for (let i = 0; i < map.length; i++) {
    if (map[i].owner !== "none") {
      answer.push(map[i].owner);
    }
  }
  console.log(answer);

  if (answer.length > 0) {
    // 이제 해당 주소에 토큰을 주입하면 됨
  }
  res.status(200).send(map);
};
