import express from "express";
import { getAllItem, roulette, getItem_NFT } from "../Controllers/Item.js";
const router = express.Router();

router.get("/getAllItem", getAllItem);
router.post("/roulette", roulette);
router.post("/getItem_NFT", getItem_NFT);

export default router;
