import express from "express";
import { signUp, LogIn } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", LogIn);

export default router;
