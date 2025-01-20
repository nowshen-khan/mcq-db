import { useState } from "react";
import axios from "axios";

const AddQuestionForm = () => {
	const [formData, setFormData] = useState({
		questionText: "",
		questionImage: "",
		options: [{ text: "", image: "" }],
		answerText: "",
		answerImage: "",
		noteText: "",
		noteImage: "",
		exams: { source: "", exam_year: "", exam_type: "" },
		meta: {
			class: [],
			subject: "",
			bookPart: "",
			chapter: "",
		},
		difficulty: "Medium",
		tags: [],
	});
	// ডাইনামিক সাবজেক্ট তালিকা
	const subjectsByClass = {
		"9-10": ["Physics", "Chemistry", "Biology"],
		"11-12": ["Physics", "Chemistry", "Biology"],
	};

	// ডাইনামিক bookPart এবং chapter তালিকা
	const bookPartsAndChapters = {
		"11-12": {
			bookParts: ["Part 1", "Part 2"],
			chapters: {
				"Part 1": ["Chapter 1", "Chapter 2", "Chapter 3"],
				"Part 2": ["Chapter 4", "Chapter 5", "Chapter 6"],
			},
		},

		"9-10": {
			chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
		},
	};

	// ডাইনামিক সোর্স তালিকা
	const examSources = [
		{ id: "1", name: "Dhaka Board" },
		{ id: "2", name: "Chittagong Board" },
		{ id: "3", name: "Rajshahi Board" },
	];

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleMetaChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			meta: {
				...prev.meta,
				[field]: value,
				...(field === "class"
					? { bookPart: "", chapter: "" } // ক্লাস চেঞ্জ হলে bookPart এবং chapter রিসেট হবে
					: {}),
				...(field === "bookPart" ? { chapter: "" } : {}), // bookPart চেঞ্জ হলে chapter রিসেট হবে
			},
		}));
	};

	const handleOptionChange = (index, key, value) => {
		const updatedOptions = [...formData.options];
		updatedOptions[index][key] = value;
		setFormData((prev) => ({ ...prev, options: updatedOptions }));
	};

	const handleAddOption = () => {
		setFormData((prev) => ({
			...prev,
			options: [...prev.options, { text: "", image: "" }],
		}));
	};

	const handleRemoveOption = (index) => {
		const updatedOptions = [...formData.options];
		updatedOptions.splice(index, 1);
		setFormData((prev) => ({ ...prev, options: updatedOptions }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:5000/api/questions",
				formData
			);
			alert("Question added successfully!");
			console.log(response.data);
		} catch (error) {
			console.error("Error adding question:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Add Question</h2>

			<label>
				Question Text:
				<textarea
					name="questionText"
					value={formData.questionText}
					onChange={handleChange}
					required
				/>
			</label>

			<label>
				Question Image:
				<input
					type="url"
					name="questionImage"
					value={formData.questionImage}
					onChange={handleChange}
				/>
			</label>

			<h3>Meta Information</h3>
			<label>
				Class:
				<select
					name="meta.class"
					value={formData.meta.class}
					onChange={(e) => handleMetaChange("class", e.target.value)}
					required
				>
					<option value="">Select Class</option>
					{Object.keys(subjectsByClass).map((cls) => (
						<option key={cls} value={cls}>
							{cls}
						</option>
					))}
				</select>
			</label>

			<label>
				Subject:
				<select
					name="meta.subject"
					value={formData.meta.subject}
					onChange={(e) => handleMetaChange("subject", e.target.value)}
					required
				>
					<option value="">Select Subject</option>
					{(subjectsByClass[formData.meta.class] || []).map((subject) => (
						<option key={subject} value={subject}>
							{subject}
						</option>
					))}
				</select>
			</label>

			{["11-12"].includes(formData.meta.class) && (
				<>
					<label>
						Book Part:
						<select
							name="meta.bookPart"
							value={formData.meta.bookPart}
							onChange={(e) => handleMetaChange("bookPart", e.target.value)}
							required
						>
							<option value="">Select Book Part</option>
							{(bookPartsAndChapters[formData.meta.class]?.bookParts || []).map(
								(part) => (
									<option key={part} value={part}>
										{part}
									</option>
								)
							)}
						</select>
					</label>
				</>
			)}

			<label>
				Chapter:
				<select
					name="meta.chapter"
					value={formData.meta.chapter}
					onChange={(e) => handleMetaChange("chapter", e.target.value)}
					required
				>
					<option value="">Select Chapter</option>
					{(
						bookPartsAndChapters[formData.meta.class]?.chapters[
							formData.meta.bookPart || "Part 1"
						] || []
					).map((chapter) => (
						<option key={chapter} value={chapter}>
							{chapter}
						</option>
					))}
				</select>
			</label>

			<h3>Options</h3>
			{formData.options.map((option, index) => (
				<div key={index}>
					<label>
						Option Text:
						<input
							type="text"
							value={option.text}
							onChange={(e) =>
								handleOptionChange(index, "text", e.target.value)
							}
							required
						/>
					</label>
					<label>
						Option Image:
						<input
							type="url"
							value={option.image}
							onChange={(e) =>
								handleOptionChange(index, "image", e.target.value)
							}
						/>
					</label>
					{formData.options.length > 1 && (
						<button type="button" onClick={() => handleRemoveOption(index)}>
							Remove Option
						</button>
					)}
				</div>
			))}
			<button type="button" onClick={handleAddOption}>
				Add Option
			</button>

			<label>
				Answer Text:
				<input
					type="text"
					name="answerText"
					value={formData.answerText}
					onChange={handleChange}
					required
				/>
			</label>
			<label>
				Answer Image:
				<input
					type="url"
					name="answerImage"
					value={formData.answerImage}
					onChange={handleChange}
				/>
			</label>
			<h3>Note</h3>
			<label>
				Note Text:
				<textarea
					name="noteText"
					value={formData.noteText}
					onChange={handleChange}
				/>
			</label>
			<label>
				Note Image:
				<input
					type="url"
					name="noteImage"
					value={formData.noteImage}
					onChange={handleChange}
				/>
			</label>

			<h3>Exam Details</h3>
			<label>
				Exam Year:
				<input
					type="number"
					name="exams.exam_year"
					value={formData.exams.exam_year}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							exams: { ...prev.exams, exam_year: e.target.value },
						}))
					}
					required
				/>
			</label>
			<label>
				Exam Type:
				<select
					name="exams.exam_type"
					value={formData.exams.exam_type}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							exams: { ...prev.exams, exam_type: e.target.value },
						}))
					}
				>
					<option value="school_exam">School Exam</option>
					<option value="college_exam">College Exam</option>
					<option value="board_exam">Board Exam</option>
				</select>
			</label>
			<label>
				Exam Source:
				<select
					name="exams.exam_source"
					value={formData.exams.exam_source}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							exams: { ...prev.exams, exam_source: e.target.value },
						}))
					}
				>
					{examSources.map((source) => (
						<option key={source.id} value={source.id}>
							{source.name}
						</option>
					))}
				</select>
			</label>

			<label>
				Difficulty:
				<select
					name="difficulty"
					value={formData.difficulty}
					onChange={handleChange}
				>
					<option value="Easy">Easy</option>
					<option value="Medium">Medium</option>
					<option value="Hard">Hard</option>
				</select>
			</label>

			<button type="submit">Add Question</button>
		</form>
	);
};

export default AddQuestionForm;
