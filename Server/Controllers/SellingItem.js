import { SellingItemDB, UserDB } from "../models.js";
import { makeTrade, tradeOff, Bidding } from "../web3/web3.js";

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
    makeTrade(price, item.id);
    res.status(200).send({ message: "상품 등록 완료!" });
  } else {
    res.status(200).send({ message: "이미 등록된 상품 입니다!" });
  }
};

export const Bid = async (req, res) => {
  const Bider_address = req.body.player;
  const Item = req.body.item;

  const Price = req.body.price;
  const User = await UserDB.findOne({ address: Bider_address });
  if (Item.buyer === "none") {
    await SellingItemDB.findOneAndUpdate(
      { id: Item.id },
      { buyer: Bider_address, price: Number(Price) },
      {
        new: true,
      }
    );
    await UserDB.findOneAndUpdate(
      { address: Bider_address },
      { Token: User.Token - Number(Price) },
      { new: true }
    );
    Bidding(Number(Price), Bider_address, Item.id);
    res.status(200).send({ message: "Bid 완료!!" });
  } else {
    if (Item.buyer === Bider_address) {
      res.status(200).send({ message: "이미 경매 우선순위 입니다!" });
    } else {
      const item = await SellingItemDB.findOne({ id: Item.id });
      const before_user = await UserDB.findOne({ address: item.buyer });

      await UserDB.findOneAndUpdate(
        { address: before_user.address },
        { Token: before_user.Token + Number(item.price) },
        { new: true }
      );

      await UserDB.findOneAndUpdate(
        { address: User.address },
        { Token: User.Token - Price },
        { new: true }
      );

      await SellingItemDB.findOneAndUpdate(
        { id: Item.id },
        { buyer: User.address, price: Number(Price) },
        {
          new: true,
        }
      );
      Bid(Number(Price), User.address, Item.id);
      res.status(200).send({ message: "New Bidding!!!!" });
    }
  }
};

export const trade = async (req, res) => {
  console.log("trading!!!");
  const now_time = new Date();
  const temp = await SellingItemDB.find({});

  for (let i = 0; i < temp.length; i++) {
    if (temp[i].time <= now_time) {
      if (temp[i].buyer === "none") {
        await SellingItemDB.findOneAndDelete({ id: temp[i].id });
        tradeOff(temp[i].id);
      } else {
        const Seller = await UserDB.findOne({ address: temp[i].seller });
        const Buyer = await UserDB.findOne({ address: temp[i].buyer });
        const item = await SellingItemDB.findOne({ id: temp[i].id });

        const Item_list = Seller.NFTList;
        let arr = [];

        for (let j = 0; j < Item_list.length; j++) {
          if (Item_list[j].id !== temp[i].id) {
            arr.push(Item_list[j]);
          }
        }

        await UserDB.findOneAndUpdate(
          { address: temp[i].seller },
          {
            NFTList: arr,
            Token: Seller.Token + item.price,
          },
          { new: true }
        );

        await UserDB.findOneAndUpdate(
          { address: temp[i].buyer },
          {
            NFTList: [...Buyer.NFTList, item.item],
          },
          { new: true }
        );
        await SellingItemDB.findOneAndDelete({ id: temp[i].id });
        trade(temp[i].id);
      }
    }
  }
};
