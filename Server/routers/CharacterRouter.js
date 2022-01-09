import express from "express";
import { makeCharacter, AllCharacter } from "../Controllers/Character.js";
const router = express.Router();

router.post("/makeCharacter", makeCharacter);
router.get("/AllCharacter", AllCharacter);

export default router;
