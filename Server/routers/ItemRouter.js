import express from "express";
import { getAllItem } from "../Controllers/Item.js";
const router = express.Router();

router.get("/getAllItem", getAllItem);

export default router;
