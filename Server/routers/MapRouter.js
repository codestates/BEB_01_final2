import express from "express";

const router = express.Router();
import { AllMap, updateMap, detailMap } from "../Controllers/Map.js";

router.get("/AllMap", AllMap);
router.get("/detail/:id", detailMap);
router.post("/updateMap", updateMap);

export default router;
