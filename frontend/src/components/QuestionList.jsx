import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const QuestionList = () => {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await axios.get("http://localhost:5000/api/question");
				setQuestions(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching questions:", error);
			} finally {
				setLoading(false);
			}
		};
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
		<Container className="mt-4">
			<h1 className="text-center mb-4">All Questions</h1>
			<Row className="g-4">
				{questions.map((q, index) => (
					<Col key={q._id} xs={12} sm={10} md={6} lg={4} className="mb-4">
						<Card className="h-100 shadow-sm">
							<Card.Body>
								<Card.Title className="mb-3">
									{index + 1}. {q.question}
								</Card.Title>
								<Card.Text>
									{q.options.map((option, index) => (
										<strong key={index}>
											{String.fromCharCode(97 + index)}: {option}&nbsp;
										</strong>
									))}
								</Card.Text>
								<Card.Text>
									<strong>Answer:</strong> {q.answer}
								</Card.Text>
								<Card.Text>
									<strong>Difficulty:</strong> {q.difficulty}
								</Card.Text>
								<Card.Text>
									<strong>Exams:</strong>{" "}
									{q.exams
										.map((exam) => `${exam.exam_year} (${exam.exam_type})`)
										.join(", ")}
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default QuestionList;
