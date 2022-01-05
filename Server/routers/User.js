import express from "express";
import { makeUser, AllUser } from "../Controllers/User.js";
const router = express.Router();

router.post("/makeUser", makeUser);
router.get("/AllUser", AllUser);

export default router;
