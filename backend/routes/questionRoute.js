import express from "express";
import {
	createQuestion,
	getAllQuestions,
	getQuestionById,
	updateQuestion,
	deleteQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/", createQuestion); // Create a question
router.get("/", getAllQuestions); // Get all questions
router.get("/:id", getQuestionById); // Get a specific question by ID
router.put("/:id", updateQuestion); // Update a specific question
router.delete("/:id", deleteQuestion); // Delete a specific question

export default router;

// const protect = require("../middleware/authMiddleware");

// // Question Create Route
// router.post("/questions", async (req, res) => {
// 	const {
// 		question,
// 		options,
// 		answer,
// 		explanation,
// 		source,
// 		meta,
// 		difficulty,
// 		tags,
// 	} = req.body;

// 	try {
// 		const newQuestion = new Question({
// 			question,
// 			options,
// 			answer,
// 			explanation,
// 			source,
// 			meta,
// 			difficulty,
// 			tags,
// 		});
// 		await newQuestion.save();
// 		res.status(201).send(newQuestion);
// 	} catch (err) {
// 		res.status(500).send({ message: "Error adding question" });
// 	}
// });

// // Fetch questions for a specific exam
// router.get("/questions", async (req, res) => {
// 	const { examId, examType, examYear, page = 1, limit = 10 } = req.query;

// 	//const page = parseInt(req.query.page) || 1;
// 	//const limit = parseInt(req.query.limit) || 10;
// 	const skip = (page - 1) * limit;

// 	try {
// 		const filter = {};
// 		if (examType) filter["source.type"] = examType;
// 		if (examYear) filter["source.exam_year"] = examYear;
// 		if (examId) filter["source.examId"] = examId;
// 		const questions = await Question.find(filter)
// 			.skip((page - 1) * limit)
// 			.limit(limit)
// 			.populate("source");

// 		const totalQuestions = await Question.countDocuments(filter);
// 		res.status(200).send({
// 			questions,
// 			totalQuestions,
// 			totalPages: Math.ceil(totalQuestions / limit),
// 			currentPage: page,
// 		});
// 	} catch (err) {
// 		res.status(500).send({ message: "Error fetching questions" });
// 	}
// });

// // Update question
// router.put("/question/:id", protect, async (req, res) => {
// 	const {
// 		question,
// 		options,
// 		answer,
// 		explanation,
// 		source,
// 		meta,
// 		difficulty,
// 		tags,
// 	} = req.body;

// 	try {
// 		const updatedQuestion = await Question.findByIdAndUpdate(
// 			req.params.id,
// 			{
// 				question,
// 				options,
// 				answer,
// 				explanation,
// 				source,
// 				meta,
// 				difficulty,
// 				tags,
// 			},
// 			{ new: true }
// 		);
// 		if (!updatedQuestion) {
// 			return res.status(404).send("Question not found");
// 		}
// 		res.status(200).json(updatedQuestion);
// 	} catch (error) {
// 		res.status(500).send("Server error");
// 	}
// });

// // Delete question
// router.delete("/question/:id", protect, async (req, res) => {
// 	try {
// 		const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
// 		if (!deletedQuestion) {
// 			return res.status(404).send("Question not found");
// 		}
// 		res.status(200).send("Question deleted");
// 	} catch (error) {
// 		res.status(500).send("Server error");
// 	}
// });

// module.exports = router;
