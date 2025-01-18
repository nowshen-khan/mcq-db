import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import QuestionList from "./components/QuestionList";
import "./App.css";

const App = () => {
	return (
		<Router>
			<NavigationBar />
			<Routes>
				<Route path="/" element={<QuestionList />} />
			</Routes>
		</Router>
	);
};

export default App;
