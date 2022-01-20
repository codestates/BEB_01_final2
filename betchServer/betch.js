import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import schedule from "node-schedule";
import { giveTokenBlockChain } from "./giveToken.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const URL = process.env.URL;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));
app.use(cors());

const rule = new schedule.RecurrenceRule();
rule.minute = 30;

export let check = false;

export const changeStatus = () => {
  check = !check;
};

app.get("/", (req, res) => {
  giveTokenBlockChain();
});

schedule.scheduleJob(rule, () => {
  if (check === false) {
    giveTokenBlockChain();
  }
});

mongoose
  .connect(URL)
  .then((result, err) => {
    if (!err) {
      app.listen(PORT, (req, res) => {
        console.log(`배치서버!! ${PORT}`);
      });
    } else {
      console.error(err);
    }
  })
  .catch((err) => console.log(err.message));
