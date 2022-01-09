import express from "express";
import { makeUser, AllUser, Login } from "../Controllers/User.js";
const router = express.Router();

router.post("/makeuser", makeUser);
router.get("/allUser", AllUser);
router.post("/Login", Login);

export default router;
