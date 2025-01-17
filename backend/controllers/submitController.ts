import { Request, Response } from "express";
import { addSubmissionToQueue } from '../services/submissionService';

export const handleSubmit = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        await addSubmissionToQueue(data);
        res.status(200).send("Queue Added Successfully.");
        return;
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred.");
        return;
    }
};
