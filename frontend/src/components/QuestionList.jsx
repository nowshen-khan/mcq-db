import { useEffect, useState } from "react";
import axios from "axios";

const QuestionList = () => {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchQuestions = async () => {
			setLoading(true);
			try {
				const response = await axios.get("http://localhost:5000/api/questions");
				setQuestions(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching questions", error);
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
			<h1>Question List</h1>
			<table>
				<thead>
					<tr>
						<th>Question Text</th>
						<th>Class</th>
						<th>Subject</th>
						<th>Difficulty</th>
					</tr>
				</thead>
				<tbody>
					{questions.length === 0 ? (
						<tr>
							<td colSpan="4">No questions found</td>
						</tr>
					) : (
						questions.map((question) => (
							<tr key={question._id}>
								<td>{question.question.text}</td>
								<td>{question.meta.class}</td>
								<td>{question.meta.subject}</td>
								<td>{question.difficulty}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default QuestionList;
