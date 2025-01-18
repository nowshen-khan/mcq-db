import { useEffect, useState } from "react";
import axios from "axios";

const QuestionList = () => {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/questions?examId=exam_id_here"
				);
				setQuestions(response.data);
			} catch (error) {
				console.error("Error fetching questions:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchQuestions();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{questions.map((question) => (
				<div key={question._id}>
					<h3>{question.question}</h3>
					<ul>
						{question.options.map((option, index) => (
							<li key={index}>{option}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default QuestionList;
