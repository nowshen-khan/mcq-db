import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import styles from "./Navbar.module.css";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showScrollButton, setShowScrollButton] = useState(false);

	// Scroll-to-top button visibility
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 30) {
				setShowScrollButton(true);
			} else {
				setShowScrollButton(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Scroll-to-top functionality
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<>
			<nav className="custom-navbar">
				<div className="container">
					<Link className="brand" to="/">
						MCQ DB
					</Link>
					<button
						className="toggle-button"
						aria-label="Toggle navigation"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						☰
					</button>
					<div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/questions">Questions</Link>
							</li>
							<li>
								<Link to="/add-question">Add Question</Link>
							</li>
							<li>
								<Link to="/about">About</Link>
							</li>
							<li>
								<Link to="/add-source">Add Source</Link>
							</li>
							<li>
								<Link to="/add-exam">Add Exam</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			{/* Scroll-to-top button */}
			{showScrollButton && (
				<button className="scroll-to-top" onClick={scrollToTop}>
					↑
				</button>
			)}
		</>
	);
};

export default Navbar;
