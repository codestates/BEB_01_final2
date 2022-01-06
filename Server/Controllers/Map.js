import { MapDB } from "../models.js";

export const AllMap = async (req, res) => {
  const answer = await MapDB.find();
  res.header("Access-Control-Allow-Origin", "*");
  res.send(answer);
};

export const detailMap = async (req, res) => {
  const idx = req.params.id;

  const answer = await MapDB.find({ idx: idx });
  console.log(answer);
  res.header("Access-Control-Allow-Origin", "*");
  res.send(answer);
};

export const updateMap = async (req, res) => {
  console.log("updateMap");
  res.json({ message: "hoijn" });
};
