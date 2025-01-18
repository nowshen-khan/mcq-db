import { useState, useEffect } from "react";
import axios from "axios";

const CreateQuestion = () => {
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState(["", "", "", ""]);
	const [answer, setAnswer] = useState("");
	const [explanation, setExplanation] = useState("");
	const [sources, setSources] = useState([]); // for selecting sources
	const [selectedSources, setSelectedSources] = useState([]); // for user selection

	useEffect(() => {
		// Fetch all sources (Exam documents)
		axios.get("http://localhost:5000/api/exams").then((response) => {
			setSources(response.data);
		});
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem("authToken");
		const response = await axios.post(
			"http://localhost:5000/api/question",
			{
				question,
				options,
				answer,
				explanation,
				source: selectedSources, // Pass selected sources as an array of ObjectIds
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		alert("Question created successfully");
		console.log(response.data);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Question"
				value={question}
				onChange={(e) => setQuestion(e.target.value)}
			/>{" "}
			<br />
			{options.map((option, index) => (
				<input
					key={index}
					type="text"
					placeholder={`Option ${index + 1}`}
					value={option}
					onChange={(e) => {
						const newOptions = [...options];
						newOptions[index] = e.target.value;
						setOptions(newOptions);
					}}
				/>
			))}
			<input
				type="text"
				placeholder="Answer"
				value={answer}
				onChange={(e) => setAnswer(e.target.value)}
			/>
			<textarea
				placeholder="Explanation"
				value={explanation}
				onChange={(e) => setExplanation(e.target.value)}
			/>
			<br />
			{/* Source multi-select */}
			<label>Select Sources:</label>
			<select
				multiple
				value={selectedSources}
				onChange={(e) =>
					setSelectedSources(
						Array.from(e.target.selectedOptions, (option) => option.value)
					)
				}
			>
				{sources.map((source) => (
					<option key={source._id} value={source._id}>
						{`${source.type} - ${source.name} (${source.exam_year || "N/A"})`}
					</option>
				))}
			</select>
			<button type="submit">Create Question</button>
		</form>
	);
};

export default CreateQuestion;
