import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import sourceRoutes from "./routes/sourceRoute.js";
import examRoutes from "./routes/examRoute.js";
import questionRoutes from "./routes/questionRoute.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ credentials: true }));
app.use(express.json());

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err);
	});

// Routes
app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.use("/api/sources", sourceRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/questions", questionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
