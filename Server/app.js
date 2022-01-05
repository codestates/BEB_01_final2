import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import User from "./routers/User.js";
import CharacterRouter from "./routers/CharacterRouter.js";
import MapRouter from "./routers/MapRouter.js";
import { SetMapData } from "./SetMapData.js";

const app = express();
const PORT = process.env.PORT;
const URL = process.env.URL;

app.use("/User", User);
app.use("/Character", CharacterRouter);
app.use("/Map", MapRouter);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));
app.use(cors());

mongoose
  .connect(URL)
  .then((result, err) => {
    if (!err) {
      app.listen(PORT, (req, res) => {
        console.log(`DB는 mongoose, PORT 번호는 ${PORT}`);
      });

      SetMapData();
    } else {
      console.error(err);
    }
  })
  .catch((err) => console.log(err.message));
