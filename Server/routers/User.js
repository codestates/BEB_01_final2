import express from "express";
import {
  makeUser,
  AllUser,
  Login,
  vefiry,
  vefiry_google,
} from "../Controllers/User.js";
const router = express.Router();

router.post("/makeuser", makeUser);
router.get("/allUser", AllUser);
router.post("/Login", Login);
router.get("/vefiry", vefiry);
router.post("/vefiry_google", vefiry_google);

export default router;
