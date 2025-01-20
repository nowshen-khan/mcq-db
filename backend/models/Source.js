import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema({
	bnName: { type: String, required: true, unique: true }, // Institution/Board/University name
	enName: { type: String, required: true, unique: true }, // English name of the institution
	bnAbbreviation: { type: String, maxlength: 20 }, // Institution/Board/University abbreviation
	enAbbreviation: { type: String, required: true, maxlength: 20 }, // Abbreviation of the institution
	type: {
		type: String,
		enum: ["school", "college", "board", "university", "job"],
		required: true,
	}, // বোর্ড, স্কুল, কলেজ নির্ধারণ
	board: { type: String, default: null }, //school or college Board name
});

sourceSchema.index({
	bnName: 1,
	enName: 1,
	bnAbbreviation: 1,
	enAbbreviation: 1,
	type: 1,
});

const Source = mongoose.model("Source", sourceSchema);

export default Source;
