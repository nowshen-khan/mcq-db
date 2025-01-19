import { useState } from "react";
import axios from "axios";

const QuestionForm = () => {
	const [questionData, setQuestionData] = useState({
		questionText: "",
		questionImage: "",
		options: [{ text: "", image: "" }],
		answerText: "",
		answerImage: "",
		noteText: "",
		noteImage: "",
		class: "",
		subject: "",
		part: "",
		chapter: "",
		difficulty: "Easy",
		tags: "",
	});

	// Handle change in input fields
	const handleChange = (e) => {
		const { name, value } = e.target;
		setQuestionData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Handle options change
	const handleOptionChange = (index, e) => {
		const { name, value } = e.target;
		const newOptions = [...questionData.options];
		newOptions[index][name] = value;
		setQuestionData((prev) => ({
			...prev,
			options: newOptions,
		}));
	};

	// Add new option
	const handleAddOption = () => {
		setQuestionData((prev) => ({
			...prev,
			options: [...prev.options, { text: "", image: "" }],
		}));
	};

	// Submit the form
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			question: {
				text: questionData.questionText,
				image: questionData.questionImage,
			},
			hash: new Date().getTime().toString(),
			options: questionData.options,
			answer: {
				text: questionData.answerText,
				image: questionData.answerImage,
			},
			note: {
				text: questionData.noteText,
				image: questionData.noteImage,
			},
			meta: {
				class: questionData.class,
				subject: questionData.subject,
				part: questionData.part,
				chapter: questionData.chapter,
			},
			difficulty: questionData.difficulty,
			tags: questionData.tags.split(","),
		};

		try {
			const response = await axios.post("/api/questions", formData);
			console.log(formData);
			console.log("Question submitted successfully", response.data);
		} catch (error) {
			console.error("Error submitting question", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Question Text</label>
				<textarea
					name="questionText"
					value={questionData.questionText}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label>Question Image (URL)</label>
				<input
					type="text"
					name="questionImage"
					value={questionData.questionImage}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Options</label>
				{questionData.options.map((option, index) => (
					<div key={index}>
						<input
							type="text"
							name="text"
							placeholder="Option Text"
							value={option.text}
							onChange={(e) => handleOptionChange(index, e)}
							required
						/>
						<input
							type="text"
							name="image"
							placeholder="Option Image URL"
							value={option.image}
							onChange={(e) => handleOptionChange(index, e)}
						/>
					</div>
				))}
				<button type="button" onClick={handleAddOption}>
					Add Option
				</button>
			</div>
			<div>
				<label>Answer Text</label>
				<textarea
					name="answerText"
					value={questionData.answerText}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Answer Image (URL)</label>
				<input
					type="text"
					name="answerImage"
					value={questionData.answerImage}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Note Text</label>
				<textarea
					name="noteText"
					value={questionData.noteText}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Note Image (URL)</label>
				<input
					type="text"
					name="noteImage"
					value={questionData.noteImage}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Class</label>
				<input
					type="text"
					name="class"
					value={questionData.class}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label>Subject</label>
				<input
					type="text"
					name="subject"
					value={questionData.subject}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label>Part</label>
				<input
					type="number"
					name="part"
					value={questionData.part}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Chapter</label>
				<input
					type="text"
					name="chapter"
					value={questionData.chapter}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Difficulty</label>
				<select
					name="difficulty"
					value={questionData.difficulty}
					onChange={handleChange}
				>
					<option value="Easy">Easy</option>
					<option value="Medium">Medium</option>
					<option value="Hard">Hard</option>
				</select>
			</div>
			<div>
				<label>Tags (comma separated)</label>
				<input
					type="text"
					name="tags"
					value={questionData.tags}
					onChange={handleChange}
				/>
			</div>
			<button type="submit">Submit Question</button>
		</form>
	);
};

export default QuestionForm;
