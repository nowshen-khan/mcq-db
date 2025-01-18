import Question from "../models/Question.js";

export const createQuestion = async (req, res) => {
	try {
		const {
			question,
			hash,
			options,
			answer,
			explanation,
			exams,
			meta,
			difficulty,
			tags,
		} = req.body;
		const newQuestion = await Question.create({
			question,
			hash,
			options,
			answer,
			explanation,
			exams,
			meta,
			difficulty,
			tags,
		});
		res.status(201).json(newQuestion);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getQuestions = async (req, res) => {
	try {
		const questions = await Question.find()
			.populate({
				path: "exams",
				//populate: { path: "exams", select: "type name" },
				populate: { path: "source", select: "type name board" },
			})
			.exec();
		res.status(200).json(questions);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
