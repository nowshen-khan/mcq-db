import Question from "../models/Question.js";

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
		const questions = await Question.find().populate("exams");
		//console.log(questions);
		res.status(200).json(questions);
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
