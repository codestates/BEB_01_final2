import express from "express";
import { AllSellingITem, makeSellingITem } from "../Controllers/SellingItem.js";
const router = express.Router();

router.get("/AllSellingITem", AllSellingITem);
router.post("/makeSell", makeSellingITem);

export default router;
