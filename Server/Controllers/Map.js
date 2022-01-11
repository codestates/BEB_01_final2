import { MapDB } from "../models.js";

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
  const SheildAddress = req.body.SheildAddress;
  const temp = await MapDB.findOne({ idx: idx });

  console.log(temp);

  if (temp.owner === "none") {
    const answer = await MapDB.findOneAndUpdate(
      { idx: idx },
      { owner: AttackAddress },
      { new: true }
    );
    // USer업데이트 해야함
    // 클라이언트 쪽에서 방어자, 공격자의 데이터를 받아와 이겼는지를 처리하게 된다.
    // 그후 그 결과에 따라서 user값과 병사값을 수정해 준다.
    res
      .status(200)
      .send({ message: "주인이 없는 땅이기에 바로 차지합니다!", Map: answer });
  } else {
    console.log("주인이 있는 땅을 의미");
    // 주인이 있을시에 처리해야하는 로직을 작성해야함
    // 아직 어떠한 인자를 받을지 프론트쪽에서 확인하지 못하였기 때문에 나중에 작성
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
