import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";
import FilterForm from "./FilterForm";

const QuestionList = () => {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedOptions, setSelectedOptions] = useState({});
	const [total, setTotal] = useState(0);
	const handleOptionChange = (questionId, optionId) => {
		setSelectedOptions({
			...selectedOptions,
			[questionId]: optionId,
		});
	};

	const handleSubmit = (questionId) => {
		// Handle the submit action for the question
		console.log(
			`Selected option for Question ${questionId}: ${selectedOptions[questionId]}`
		);
		alert(`Answer submitted for Question ${questionId}`);
	};

	const fetchQuestions = async (filters = {}) => {
		setLoading(true);
		try {
			const query = Object.entries(filters)
				.filter(([_, value]) => value)
				.map(([key, value]) => `${key}=${value}`)
				.join("&");
			const response = await axios.get(
				`http://localhost:5000/api/questions?${query}`
			);
			setQuestions(response.data.data);
			setTotal(response.data.total);
			console.log(response.data.data);
		} catch (error) {
			console.error("Error fetching questions", error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchQuestions();
	}, []);

	if (loading) {
		return (
			<Container className="text-center mt-5">
				<Spinner animation="border" />
				<p>Loading questions...</p>
			</Container>
		);
	}

	return (
		<>
			<div>
				<FilterForm onFilter={(filters) => fetchQuestions(filters)} />

				<h3>Total Questions: {total}</h3>

				<div className="question-list-container">
					{questions.length === 0 ? (
						<p>No questions found.</p>
					) : (
						questions.map((question) => (
							<div key={question._id} className="question-container">
								<div className="question-text">
									<h3>{question.question.text}</h3>
								</div>
								<div className="options">
									{question.options.map((option, index) => (
										<div key={index} className="option">
											<input
												type="radio"
												id={`question-${question._id}-option-${index}`}
												name={`question-${question._id}`}
												value={option.text}
												checked={selectedOptions[question._id] === option.text}
												onChange={() =>
													handleOptionChange(question._id, option.text)
												}
											/>{" "}
											<label
												htmlFor={`question-${question._id}-option-${index}`}
											>
												{option.text}
											</label>
										</div>
									))}
								</div>
								<button
									className="submit-button"
									onClick={() => handleSubmit(question._id)}
								>
									Submit Answer
								</button>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
};

export default QuestionList;
