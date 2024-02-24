import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

const seed = async () => {
    const champions = JSON.parse(
        fs.readFileSync("../back/data/champions.json", "utf-8")
    );

    try {
        for (const champion of champions) {
            await prisma.champion.create({
                data: {
                    name: champion.name,
                    type: champion.type,
                },
            });
        }

        console.log("Champions seed successful!");
    } catch (error) {
        console.error("Error seeding champions:", error);
    }
};

seed();
