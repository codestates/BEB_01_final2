import express from "express";
import {
  makeUser,
  AllUser,
  Login,
  vefiry,
  vefiry_google,
  charge,
  vefiry_metamask,
  swap,
} from "../Controllers/User.js";
const router = express.Router();

router.post("/makeuser", makeUser);
router.post("/Login", Login);
router.post("/vefiry_google", vefiry_google);
router.post("/vefiry_metamask", vefiry_metamask);
router.post("/swap", swap);

router.get("/vefiry", vefiry);
router.get("/charge", charge);
router.get("/allUser", AllUser);

export default router;
