import { CharacterDB } from "../models.js";

export const makeUser = async (req, res) => {
  console.log("makeUser");
};

export const AllUser = async (req, res) => {
  console.log("AllUser");
  res.header("Access-Control-Allow-Origin", "*");
};
