import express from "express";

const router = express.Router();
import { AllMap, updateMap } from "../Controllers/Map.js";

router.get("/AllMap", AllMap);
router.post("/updateMap", updateMap);

export default router;
