import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
	source: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Source",
		required: true,
	},
	exam_year: { type: Number, required: true },
	exam_type: {
		type: String,
		enum: ["school_exam", "college_exam", "board_exam", "admission_exam"],
		required: true,
	},
});

const Exam = mongoose.model("Exam", examSchema);
export default Exam;
