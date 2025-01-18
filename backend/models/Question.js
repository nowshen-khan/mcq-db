import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
	question: { type: String, required: true },
	hash: { type: String, required: true },
	options: [String],
	answer: String,
	explanation: String,
	exams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
	meta: {
		class: { type: String, require: true },
		subject: { type: String, require: true },
		part: Number,
	},
	difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
	tags: [String],
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
