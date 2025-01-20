import { useState, useEffect } from "react";
import axios from "axios";

const AddExam = () => {
	const [formData, setFormData] = useState({
		source: "",
		exam_year: "",
		exam_type: "",
	});

	const [sources, setSources] = useState([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const fetchSources = async () => {
			try {
				const response = await axios.get("http://localhost:5000/api/sources");
				setSources(response.data);
			} catch (error) {
				console.error("Error fetching sources:", error);
			}
		};
		fetchSources();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:5000/api/exams",
				formData
			);
			setMessage("Exam added successfully!");
			setFormData({
				source: "",
				exam_year: "",
				exam_type: "",
			});
		} catch (error) {
			setMessage(
				"Error: " + (error.response?.data?.message || "Something went wrong")
			);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
				<h2 className="text-2xl font-semibold text-gray-700 mb-4">
					Add New Exam
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4 p-6">
					<div className="mb-2">
						<label className="block text-gray-600">Source:</label>
						<select
							name="source"
							value={formData.source}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">Select Source</option>
							{sources.map((source) => (
								<option key={source._id} value={source._id}>
									{source.bnName} ({source.enName})
								</option>
							))}
						</select>
					</div>

					<div className="mb-2">
						<label className="block text-gray-600">Exam Year:</label>
						<input
							type="number"
							name="exam_year"
							value={formData.exam_year}
							onChange={handleChange}
							min="2000"
							max={new Date().getFullYear()}
							required
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="mb-2">
						<label className="block text-gray-600">Exam Type:</label>
						<select
							name="exam_type"
							value={formData.exam_type}
							onChange={handleChange}
							required
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">Select Exam Type</option>
							<option value="school_exam">School Exam</option>
							<option value="college_exam">College Exam</option>
							<option value="board_exam">Board Exam</option>
							<option value="admission_exam">Admission Exam</option>
							<option value="government_exam">Government Exam</option>
							<option value="bcs_exam">BCS Exam</option>
						</select>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-gray-400 py-1 rounded hover:bg-blue-600 transition"
					>
						Add Exam
					</button>
				</form>

				{message && <p className="mt-4 text-center text-gray-600">{message}</p>}
			</div>
		</div>
	);
};

export default AddExam;
