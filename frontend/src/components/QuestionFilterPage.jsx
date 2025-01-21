import React, { useState } from "react";

const QuestionFilterPage = () => {
	const [filters, setFilters] = useState({
		class: "",
		subject: "",
		bookPart: "",
		chapter: "",
		difficulty: "",
		exam_year: "",
		exam_type: "",
		board: "",
	});

	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/questions/q", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(filters),
			});

			if (!response.ok) {
				throw new Error("Failed to fetch questions.");
			}

			const data = await response.json();
			setQuestions(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h1>Filter Questions</h1>

			{/* Filter Form */}
			<form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
				<div style={{ marginBottom: "10px" }}>
					<label>Class:</label>
					<input
						type="text"
						name="class"
						value={filters.class}
						onChange={handleChange}
						placeholder="Enter class"
						style={{ marginLeft: "10px" }}
					/>
				</div>
				<div style={{ marginBottom: "10px" }}>
					<label>Subject:</label>
					<input
						type="text"
						name="subject"
						value={filters.subject}
						onChange={handleChange}
						placeholder="Enter subject"
						style={{ marginLeft: "10px" }}
					/>
				</div>
				<div style={{ marginBottom: "10px" }}>
					<label>Book Part:</label>
					<input
						type="number"
						name="bookPart"
						value={filters.bookPart}
						onChange={handleChange}
						placeholder="Enter book part"
						style={{ marginLeft: "10px" }}
					/>
				</div>
				<div style={{ marginBottom: "10px" }}>
					<label>Chapter:</label>
					<input
						type="text"
						name="chapter"
						value={filters.chapter}
						onChange={handleChange}
						placeholder="Enter chapter"
						style={{ marginLeft: "10px" }}
					/>
				</div>
				<div style={{ marginBottom: "10px" }}>
					<label>Difficulty:</label>
					<select
						name="difficulty"
						value={filters.difficulty}
						onChange={handleChange}
						style={{ marginLeft: "10px" }}
					>
						<option value="">Select difficulty</option>
						<option value="Easy">Easy</option>
						<option value="Medium">Medium</option>
						<option value="Hard">Hard</option>
					</select>
				</div>
				<div style={{ marginBottom: "10px" }}>
					<label>Exam Year:</label>
					<input
						type="number"
						name="exam_year"
						value={filters.exam_year}
						onChange={handleChange}
						placeholder="Enter exam year"
						style={{ marginLeft: "10px" }}
					/>
				</div>
				<div style={{ marginBottom: "10px" }}>
					<label>Exam Type:</label>
					<select
						name="exam_type"
						value={filters.exam_type}
						onChange={handleChange}
						style={{ marginLeft: "10px" }}
					>
						<option value="">Select exam type</option>
						<option value="school_exam">School Exam</option>
						<option value="college_exam">College Exam</option>
						<option value="board_exam">Board Exam</option>
						<option value="admission_exam">Admission Exam</option>
						<option value="government_exam">Government Exam</option>
						<option value="bcs_exam">BCS Exam</option>
					</select>
				</div>
				<div style={{ marginBottom: "10px" }}>
					<label>Board:</label>
					<input
						type="text"
						name="board"
						value={filters.board}
						onChange={handleChange}
						placeholder="Enter board name"
						style={{ marginLeft: "10px" }}
					/>
				</div>
				<button type="submit" style={{ padding: "10px 20px" }}>
					Filter
				</button>
			</form>

			{/* Loading Spinner */}
			{loading && <p>Loading...</p>}

			{/* Error Message */}
			{error && <p style={{ color: "red" }}>{error}</p>}

			{/* Display Filtered Questions */}
			{questions.length > 0 && (
				<div>
					<h2>Filtered Questions:</h2>
					<ul>
						{questions.map((question) => (
							<li key={question._id} style={{ marginBottom: "10px" }}>
								<p>
									<strong>Question:</strong> {question.question.text}
								</p>
								<p>
									<strong>Class:</strong> {question.meta.class.join(", ")}
								</p>
								<p>
									<strong>Subject:</strong> {question.meta.subject}
								</p>
								<p>
									<strong>Difficulty:</strong> {question.difficulty}
								</p>
								{/* Other fields can be displayed here */}
							</li>
						))}
					</ul>
				</div>
			)}

			{/* No Results */}
			{!loading && questions.length === 0 && <p>No questions found.</p>}
		</div>
	);
};

export default QuestionFilterPage;
