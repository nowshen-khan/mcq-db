import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FilterForm = ({ onFilter }) => {
	const [filters, setFilters] = useState({
		class: "",
		subject: "",
		bookPart: "",
		chapter: "",
		difficulty: "",
		sourceType: "",
		examYear: "",
		examType: "",
		sortOrder: "asc",
	});

	const handleChange = (e) => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onFilter(filters);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row>
				<Col md={3}>
					<Form.Group>
						<Form.Label>Exam</Form.Label>
						<Form.Control
							type="text"
							name="exam"
							value={filters.exam}
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group>
						<Form.Label>Class</Form.Label>
						<Form.Control
							type="text"
							name="metaClass"
							value={filters.metaClass}
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>

				<Col md={3}>
					<Form.Group>
						<Form.Label>Subject</Form.Label>
						<Form.Control
							type="text"
							name="metaSubject"
							value={filters.metaSubject}
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group>
						<Form.Label>Book Part</Form.Label>
						<Form.Control
							type="text"
							name="metaBookPart"
							value={filters.metaBookPart}
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={3}>
					<Form.Group>
						<Form.Label>Chapter</Form.Label>
						<Form.Control
							type="text"
							name="metaChapter"
							value={filters.metaChapter}
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group>
						<Form.Label>Difficulty</Form.Label>
						<Form.Control
							as="select"
							name="difficulty"
							value={filters.difficulty}
							onChange={handleChange}
						>
							<option value="">All</option>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</Form.Control>
					</Form.Group>
				</Col>

				<Col md={3}>
					<Form.Group>
						<Form.Label>Source Type</Form.Label>
						<Form.Control
							type="text"
							name="sourceType"
							value={filters.sourceType}
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group>
						<Form.Label>Exam Year</Form.Label>
						<Form.Control
							type="text"
							name="examYear"
							value={filters.examYear}
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={3}>
					<Form.Group>
						<Form.Label>Exam Type</Form.Label>
						<Form.Control
							type="text"
							name="examType"
							value={filters.examType}
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group>
						<Form.Label>Sort Order</Form.Label>
						<Form.Control
							as="select"
							name="sortOrder"
							value={filters.sortOrder}
							onChange={handleChange}
						>
							<option value="asc">Ascending</option>
							<option value="desc">Descending</option>
						</Form.Control>
					</Form.Group>
				</Col>
			</Row>
			<Button variant="primary" type="submit" className="mt-3">
				Apply Filters
			</Button>
		</Form>
	);
};

export default FilterForm;
