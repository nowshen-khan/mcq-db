import Source from "../models/Source.js";

export const createSource = async (req, res) => {
	try {
		const { name, type, board } = req.body;
		const newSource = await Source.create({ type, name, board });
		res.status(201).json(newSource);
	} catch (error) {
		res.status(500).json({ error: error.message });
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
