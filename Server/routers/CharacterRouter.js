import express from "express";
import { oneCharacter, AllCharacter } from "../Controllers/Character.js";

const router = express.Router();

router.post("/oneCharacter", oneCharacter);
router.post("/AllCharacter", AllCharacter);

export default router;
