import { SellingItemDB } from "../models.js";
export const AllSellingITem = async (req, res) => {
  const answer = await SellingItemDB.find({});
  res.status(200).send({ data: answer });
};
export const makeSellingITem = async (req, res) => {
  const price = req.body.price;
  const item = req.body.item;
  const owner = req.body.owner;

  const ch = await SellingItemDB.findOne({ id: item.id });
  if (ch === null) {
    const temp = new Date();
    temp.setDate(temp.getDate() + 1);
    const answer = await new SellingItemDB({
      id: item.id,
      seller: owner.address,
      price: price,
      item: item,
      time: temp,
    });
    answer.save();
    res.status(200).send({ message: "상품 등록 완료!" });
  } else {
    res.status(200).send({ message: "이미 등록된 상품 입니다!" });
  }
};
