import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import QuestionList from "./components/QuestionList";

import AddQuestionForm from "./components/AddQuestionForm";

import AddExam from "./pages/Add/AddExam";
import SourceList from "./pages/ShowList/SourceList";
import "./App.css";

const Home = () => <h1>Welcome to MCQ DB</h1>;
const Questions = () => (
	<>
		<h1>All Questions</h1>
		<QuestionList />
	</>
);
const AddQuestion = () => (
	<>
		<h1>Add New Question</h1>
		{/* <QuestionForm /> */}
		<AddQuestionForm />
	</>
);
const About = () => <h1>About MCQ DB</h1>;

const App = () => {
	return (
		<Router>
			<Navbar />
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/questions" element={<Questions />} />
					<Route path="/add-question" element={<AddQuestion />} />
					<Route path="/about" element={<About />} />
					<Route path="/add-source" element={<SourceList />} />
					<Route path="/add-exam" element={<AddExam />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
