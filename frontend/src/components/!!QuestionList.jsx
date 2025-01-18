import { useState, useEffect } from "react";
import axios from "axios";
import QuestionFilter from "./QuestionFilter";

const QuestionList = () => {
	const [questions, setQuestions] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		// Load all questions by default
		fetchQuestions();
	}, [currentPage]);

	const fetchQuestions = async () => {
		try {
			// const response = await axios.get("http://localhost:5000/api/questions", {
			// 	params: { page: currentPage },
			// });
			const response = await axios.get(
				`http://localhost:5000/api/questions?page=${currentPage}&limit=10`
			);
			setQuestions(response.data.questions);
			setTotalPages(response.data.totalPages);
		} catch (error) {
			console.error("Error fetching questions:", error);
		}
	};

	return (
		<div>
			<h2>Questions</h2>
			<QuestionFilter setQuestions={setQuestions} />
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
			<div>
				<button
					onClick={() => setCurrentPage(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				<span>
					Page {currentPage} of {totalPages}
				</span>
				<button
					onClick={() => setCurrentPage(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
};
export default QuestionList;
