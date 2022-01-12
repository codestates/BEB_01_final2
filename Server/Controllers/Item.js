import { ItemDB } from "../models.js";

export const getAllItem = async (req, res) => {
  const ItemList = await ItemDB.find({});
  res.status(200).send(ItemList);
};
