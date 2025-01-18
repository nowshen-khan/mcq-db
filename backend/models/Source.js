import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema({
	name: { type: String, required: true }, // Institution/Board/University name
	type: {
		type: String,
		enum: ["school", "college", "board", "university"],
		required: true,
	}, // বোর্ড, স্কুল, কলেজ নির্ধারণ
	board: { type: String }, // Board name (if applicable)
});

const Source = mongoose.model("Source", sourceSchema);

export default Source;
