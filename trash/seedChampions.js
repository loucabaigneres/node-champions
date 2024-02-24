import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();

export const seedChampions = async () => {
    try {
        const championsData = JSON.parse(
            await readFile("../back/data/champions.json", "utf-8")
        );

        for (const champion of championsData) {
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
    } finally {
        await prisma.$disconnect();
    }
};

seedChampions();