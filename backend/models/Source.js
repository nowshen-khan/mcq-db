import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema({
	bnName: { type: String, required: true, unique: true }, // Institution/Board/University name
	enName: { type: String, required: true, unique: true }, // English name of the institution
	bnAbbreviation: { type: String }, // Institution/Board/University abbreviation
	enAbbreviation: { type: String, required: true }, // Abbreviation of the institution
	type: {
		type: String,
		enum: ["school", "college", "board", "university"],
		required: true,
	}, // বোর্ড, স্কুল, কলেজ নির্ধারণ
	board: { type: String }, //school or college Board name
});

sourceSchema.index({
	bnName: 1,
	enName: 1,
	bnAbbreviation: 1,
	enAbbreviation: 1,
});

const Source = mongoose.model("Source", sourceSchema);

export default Source;
