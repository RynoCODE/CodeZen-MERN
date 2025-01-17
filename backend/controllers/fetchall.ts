import { Request, Response } from "express";
import { prismaClient } from "../lib/db";
import redisClient from "../lib/redisClient";

export const fetchall = async (req: Request, res: Response) => {
    try {
        const cacheKey = "questions";
        const cachedQuestions = await redisClient.get(cacheKey);

        if (cachedQuestions) {
            console.log("Fetchall Cache Hit")
            res.json(JSON.parse(cachedQuestions));
            return;
        }
        console.log("Fetchall Cache Miss")
        const questions = await prismaClient.questions.findMany({
            select: {
                question_id: true,
                question: true
            }
        });

        await redisClient.set(cacheKey, JSON.stringify(questions), "EX", 60*5); 
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching questions." });
    }
};
