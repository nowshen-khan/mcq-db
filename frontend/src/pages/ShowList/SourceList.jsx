import { useEffect, useState } from "react";
import axios from "axios";
import AddSource from "../Add/AddSource";
import styles from "./SourceList.module.css";

const SourceList = () => {
	const [sources, setSources] = useState([]);
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
	return (
		<>
			<AddSource />
			<h1>Source List</h1>
			<ul className={styles.responsiveList}>
				{sources.map((source) => (
					<li key={source._id}>
						<p>
							{source.bnName} ({source.bnAbbreviation})
						</p>
						<p>
							{source.enName} ({source.enAbbreviation})
						</p>
					</li>
				))}
			</ul>
		</>
	);
};

export default SourceList;
