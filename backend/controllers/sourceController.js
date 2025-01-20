import Source from "../models/Source.js";

export const createSource = async (req, res) => {
	try {
		const source = new Source(req.body);
		await source.save();
		res.status(201).json({ message: "Source added successfully!" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const getSources = async (req, res) => {
	try {
		const sources = await Source.find();
		res.status(200).json(sources);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
