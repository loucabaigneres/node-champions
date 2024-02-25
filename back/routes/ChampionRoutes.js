import express from "express";
import {
    getChampions,
    getChampion,
    createChampion,
    updateChampion,
    deleteChampion,
} from "../controllers/ChampionController.js";
import { seedChampions } from "../scripts/seedChampions.js";
import authenticateToken from "../middlewares/authToken.js";

const router = express.Router();

router.get("/", getChampions);
router.get("/:id", getChampion);
router.post("/", authenticateToken, createChampion);
router.put("/:id", authenticateToken, updateChampion);
router.delete("/:id", authenticateToken, deleteChampion);

router.post("/seed", async (req, res) => {
    try {
        await seedChampions();
        res.status(200).json({ message: "Champions seed successful!" });
    } catch (error) {
        console.error("Error seeding champions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
