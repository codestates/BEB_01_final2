import express from "express";
import {
  AllSellingITem,
  makeSellingITem,
  Bid,
  trade,
} from "../Controllers/SellingItem.js";
const router = express.Router();

router.get("/AllSellingITem", AllSellingITem);
router.post("/makeSell", makeSellingITem);
router.post("/Bid", Bid);
router.get("/trade", trade);

export default router;
