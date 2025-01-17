import express from "express";
import { fetchQuestion } from "../controllers/questionController";
import { handleRun } from "../controllers/runController";
import { handleSubmit } from "../controllers/submitController";
import { fetchall } from "../controllers/fetchall";
import cors from "cors";

const router = express.Router();
router.use(cors());
router.use(express.json());

router.post("/run", handleRun);
router.post("/submit", handleSubmit);
router.get("/fetchquestion/:id", fetchQuestion);
router.get("/fetchall", fetchall);

export default router;
