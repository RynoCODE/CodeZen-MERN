import { Request, Response } from "express";
import { prismaClient } from "../lib/db";
import client from "../lib/redisClient";

export const fetchQuestion = async (req: Request, res: Response) => {
    const questionId = req.params.id as string;

    if (!questionId) {
        console.error("Question ID is required");
        res.status(400).json({ error: "Question ID is required" });
        return;
    }

    try {
        const cacheKey = `question:${questionId}`;
        const cachedQuestion = await client.get(cacheKey);
        console.log(cacheKey)
        if (cachedQuestion) {
            console.log("Cache Hit")
            res.json(JSON.parse(cachedQuestion));
            return;
        }
        console.log("Cache Miss")
        const question = await prismaClient.questions.findUnique({
            where: { question_id: parseInt(questionId, 10) },
            include: {
                question_template: {
                    include: {
                        testcases: true,
                    },
                },
            },
        });

        if (question) {
            await client.set(cacheKey, JSON.stringify(question), 'EX', 10*60); 
            res.json(question);
            return;
        }

        // await client.set(cacheKey, JSON.stringify({ error: "Question not found" }), 'EX', 5*60);
        res.status(404).json({ error: "Question not found" });
    } catch (error) {
        console.error("Error fetching question:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
