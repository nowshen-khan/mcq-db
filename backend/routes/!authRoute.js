const express = require("express");
const User = require("../models/!User");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;

	const userExists = await User.findOne({ email });
	if (userExists) {
		return res.status(400).send("User already exists");
	}

	const user = new User({
		username,
		email,
		password,
	});

	await user.save();

	const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
	res.status(201).send({ token });
});

// Login Route
router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).send("Invalid credentials");
	}

	const isMatch = await user.matchPassword(password);
	if (!isMatch) {
		return res.status(400).send("Invalid credentials");
	}

	const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
	res.status(200).send({ token });
});

module.exports = router;
