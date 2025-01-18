import React, { useState, useEffect } from "react";
import axios from "axios";

const QuestionFilter = ({ setQuestions }) => {
	const [examType, setExamType] = useState("");
	const [examYear, setExamYear] = useState("");
	const [loading, setLoading] = useState(false);

	const handleFilter = async () => {
		setLoading(true);
		try {
			const response = await axios.get("http://localhost:5000/api/questions", {
				params: { examType, examYear },
			});
			setQuestions(response.data);
		} catch (error) {
			console.error("Error fetching filtered questions:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<select onChange={(e) => setExamType(e.target.value)} value={examType}>
				<option value="">Select Exam Type</option>
				<option value="school">School</option>
				<option value="college">College</option>
				<option value="board">Board</option>
				<option value="admission">Admission</option>
			</select>

			<input
				type="number"
				placeholder="Exam Year"
				value={examYear}
				onChange={(e) => setExamYear(e.target.value)}
			/>

			<button onClick={handleFilter} disabled={loading}>
				{loading ? "Loading..." : "Apply Filter"}
			</button>
		</div>
	);
};

export default QuestionFilter;
