import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import User from "./routers/User.js";
import ItemRouter from "./routers/ItemRouter.js";
import MapRouter from "./routers/MapRouter.js";
import { SetMapData } from "./functions/SetMapData.js";
import { setItemData } from "./functions/SetItemData.js";
import { web3 } from "./web3/web3.js";

const app = express();
const PORT = process.env.PORT;
const URL = process.env.URL;
export let nonce;

const getnonce = async () => {
  const firstNonce = await web3.eth.getTransactionCount(
    process.env.Server_Address
  );
  nonce = firstNonce;
  console.log("account의 nonce값 = " + nonce);
};

export const plusnonce = async () => {
  nonce++;
  console.log(nonce);
};

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));
app.use(cors());

app.use("/", User);
app.use("/Item", ItemRouter);
app.use("/Map", MapRouter);

mongoose
  .connect(URL)
  .then((result, err) => {
    if (!err) {
      app.listen(PORT, (req, res) => {
        console.log(`DB는 mongoose, PORT 번호는 ${PORT}`);
      });
      setTimeout(getnonce, 1000);
      SetMapData();
      setItemData();
    } else {
      console.error(err);
    }
  })
  .catch((err) => console.log(err.message));
