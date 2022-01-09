import express from "express";

const router = express.Router();
import { AllMap, updateMap, detailMap, GiveToken } from "../Controllers/Map.js";

router.get("/AllMap", AllMap);
router.get("/detail/:id", detailMap);
router.post("/updateMap", updateMap);
router.get("/GiveToken", GiveToken);

export default router;
