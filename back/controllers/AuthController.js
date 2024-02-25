import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    prisma.user
        .create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })
        .then((user) => {
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                }
            );
            res.json(token);
        })
        .catch((error) => {
            // res.json(error);
            res.status(400).json({ error: "Invalid request" });
        });
};

const LogIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        return res.json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({ error: "Invalid password" });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );

    res.json(token);
};

export { signUp, LogIn };
