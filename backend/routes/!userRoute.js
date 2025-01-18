// Profile Route
const express = require("express");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get User Profile
router.get("/profile", protect, async (req, res) => {
	try {
		const user = await User.findById(req.user).select("-password");
		if (!user) {
			return res.status(404).send("User not found");
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500).send("Server error");
	}
});

// Update User Profile
router.put("/profile", protect, async (req, res) => {
	const { username, email } = req.body;

	try {
		const user = await User.findById(req.user);
		if (!user) {
			return res.status(404).send("User not found");
		}

		user.username = username || user.username;
		user.email = email || user.email;

		await user.save();
		res.status(200).json(user);
	} catch (error) {
		res.status(500).send("Server error");
	}
});

module.exports = router;
