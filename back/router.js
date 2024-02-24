import express from "express";
import champions from "./routes/ChampionRoutes.js";

const router = express.Router();

router.use("/champions", champions);

export default router;
