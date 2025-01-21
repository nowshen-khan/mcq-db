import Question from "../models/Question.js";

const filterQuestions = async (filters) => {
	const {
		class: classFilter,
		subject,
		bookPart,
		chapter,
		difficulty,
		exam_year,
		exam_type,
		board,
	} = filters;

	try {
		const questions = await Question.aggregate([
			// 1. Join with Exam collection
			{
				$lookup: {
					from: "exams", // Exam collection name
					localField: "exams",
					foreignField: "_id",
					as: "examDetails",
				},
			},
			// 2. Join with Source collection
			{
				$lookup: {
					from: "sources", // Source collection name
					localField: "examDetails.source",
					foreignField: "_id",
					as: "sourceDetails",
				},
			},
			// 3. Match filters
			{
				$match: {
					...(classFilter && { "meta.class": classFilter }),
					...(subject && { "meta.subject": subject }),
					...(bookPart && { "meta.bookPart": bookPart }),
					...(chapter && { "meta.chapter": chapter }),
					...(difficulty && { difficulty }),
					...(exam_year && { "examDetails.exam_year": exam_year }),
					...(exam_type && { "examDetails.exam_type": exam_type }),
					...(board && { "sourceDetails.board": board }),
				},
			},
			// 4. Optional: Select specific fields
			{
				$project: {
					question: 1,
					options: 1,
					answer: 1,
					meta: 1,
					difficulty: 1,
					"examDetails.exam_year": 1,
					"examDetails.exam_type": 1,
					"sourceDetails.board": 1,
				},
			},
		]);

		return questions;
	} catch (error) {
		console.error("Error fetching questions:", error);
		throw new Error("Failed to fetch questions.");
	}
};

export const getAllQuestion = async (req, res) => {
	try {
		const filters = req.body;
		const questions = await filterQuestions(filters);
		res.status(200).json(questions);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Add Question Controller
import express from "express";
const router = express.Router();
router.post("/check-question", async (req, res) => {
	const { question } = req.body;

	try {
		const existingQuestion = await Question.findOne({ question });

		if (existingQuestion) {
			res.status(200).json({ exists: true, id: existingQuestion._id });
		} else {
			res.status(200).json({ exists: false });
		}
	} catch (error) {
		console.error("Error checking question:", error);
		res.status(500).json({ message: "Server error" });
	}
});

export const addQuestion = async (req, res) => {
	try {
		const { question, options, answer, meta, difficulty, exams, tags, note } =
			req.body;

		// Create new question
		const newQuestion = new Question({
			question,
			options,
			answer,
			meta,
			difficulty,
			exams,
			tags,
			note,
		});

		await newQuestion.save();

		res.status(201).json({
			message: "Question added successfully",
			data: newQuestion,
		});
	} catch (error) {
		console.error("Error creating question:", error);
		res.status(500).json({
			message: "Failed to add question",
			error: error.message,
		});
	}
};

// Create a new question
export const createQuestion = async (req, res) => {
	try {
		const question = new Question(req.body);
		await question.save();
		res
			.status(201)
			.json({ message: "Question created successfully", question });
	} catch (error) {
		res
			.status(400)
			.json({ message: "Error creating question", error: error.message });
	}
};

// Get all questions
export const getAllQuestions = async (req, res) => {
	try {
		const {
			class: classes,
			subject,
			bookPart,
			chapter,
			difficulty,
			sourceType,
			examYear,
			examType,
		} = req.query;

		const filters = {};
		if (classes) filters["meta.class"] = { $in: classes.split(",") };
		if (subject) filters["meta.subject"] = subject;
		if (bookPart) filters["meta.bookPart"] = parseInt(bookPart);
		if (chapter) filters["meta.chapter"] = chapter;
		if (difficulty) filters.difficulty = difficulty;
		if (sourceType) filters["exams.source.type"] = sourceType;
		if (examYear) filters["exams.exam_year"] = parseInt(examYear);
		if (examType) filters["exams.exam_type"] = examType;
		const sortOrder = filters.sortOrder === "desc" ? -1 : 1;
		// Pagination Parameters
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		const questions = await Question.find(filters)
			.populate("exams")
			.skip(skip)
			.limit(limit);

		// Total Count
		const total = await Question.countDocuments(filters);

		res.status(200).json({
			data: questions,
			total,
			page,
			pages: Math.ceil(total / limit),
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching questions", error: error.message });
	}
};

// Get a single question by ID
export const getQuestionById = async (req, res) => {
	const { id } = req.params;
	try {
		const question = await Question.findById(id).populate("exams");
		if (!question) {
			return res.status(404).json({ message: "Question not found" });
		}
		res.status(200).json(question);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching question", error: error.message });
	}
};

// Update a question
export const updateQuestion = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updatedQuestion) {
			return res.status(404).json({ message: "Question not found" });
		}
		res
			.status(200)
			.json({ message: "Question updated successfully", updatedQuestion });
	} catch (error) {
		res
			.status(400)
			.json({ message: "Error updating question", error: error.message });
	}
};

// Delete a question
export const deleteQuestion = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedQuestion = await Question.findByIdAndDelete(id);
		if (!deletedQuestion) {
			return res.status(404).json({ message: "Question not found" });
		}
		res.status(200).json({ message: "Question deleted successfully" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error deleting question", error: error.message });
	}
};
