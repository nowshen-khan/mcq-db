import express from "express";
import { createExam, getExams } from "../controllers/examController.js";

const router = express.Router();

router.post("/", createExam);
router.get("/", getExams);

export default router;
