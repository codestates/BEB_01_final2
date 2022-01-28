import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import {
  User,
  ItemRouter,
  MapRouter,
  CharacterRouter,
  SellingItemRouter,
  Swap,
} from "./routers/TotalRouter.js";

import { SetMapData } from "./functions/SetMapData.js";
import { setItemData } from "./functions/SetItemData.js";
import { UserDB } from "./models.js";
import { get_contract } from "./functions/get_contract.js";

const app = express();
const PORT = process.env.PORT;
const URL = process.env.URL;

export let NFT_index;

const getNFT_amount = async () => {
  const answer = await UserDB.find();
  let amount = 0;
  for (let i = 0; i < answer.length; i++) {
    amount += answer[i].NFTList.length;
  }
  NFT_index = amount + 1;
};

export const plusNFT_index = async () => {
  NFT_index++;
};

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));
app.use(cors());

app.use("/", User);
app.use("/Item", ItemRouter);
app.use("/Map", MapRouter);
app.use("/Character", CharacterRouter);
app.use("/SellingItem", SellingItemRouter);
app.use("/Swap", Swap);

app.get("/get_contract", get_contract);
mongoose
  .connect(URL)
  .then((result, err) => {
    if (!err) {
      app.listen(PORT, async (req, res) => {
        console.log(`DB는 mongoose, PORT 번호는 ${PORT}`);

        getNFT_amount();
        SetMapData();
        setItemData();
      });
    } else {
      console.error(err);
    }
  })
  .catch((err) => console.log(err.message));
