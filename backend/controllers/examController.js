import Exam from "../models/Exam.js";

export const createExam = async (req, res) => {
	try {
		const { source, exam_year, exam_type } = req.body;
		const newExam = await Exam.create({ source, exam_year, exam_type });
		res.status(201).json(newExam);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getExams = async (req, res) => {
	try {
		const exams = await Exam.find().populate("source");
		res.status(200).json(exams);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
