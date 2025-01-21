import express from "express";
import {
	createQuestion,
	getAllQuestions,
	getQuestionById,
	updateQuestion,
	deleteQuestion,
	addQuestion,
	getAllQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/q", getAllQuestion); // Create a question
router.post("/", createQuestion); // Create a question
router.post("/", addQuestion); // Create a question
router.get("/", getAllQuestions); // Get all questions
router.get("/:id", getQuestionById); // Get a specific question by ID
router.put("/:id", updateQuestion); // Update a specific question
router.delete("/:id", deleteQuestion); // Delete a specific question

export default router;
