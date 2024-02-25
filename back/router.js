import express from "express";
import champions from "./routes/ChampionRoutes.js";
import auth from "./routes/AuthRoutes.js";

const router = express.Router();

router.use("/champions", champions);
router.use("/auth", auth);

export default router;
