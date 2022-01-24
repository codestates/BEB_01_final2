import express from "express";
import { eth_Token, Token_eth } from "../Controllers/Swap.js";

const router = express.Router();

router.post("/eth_Token", eth_Token);
router.post("/Token_eth", Token_eth);

export default router;
