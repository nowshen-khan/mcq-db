import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		// Get user data
		const fetchUser = async () => {
			const token = localStorage.getItem("authToken");
			const response = await axios.get("http://localhost:5000/api/profile", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setUser(response.data);
			setUsername(response.data.username);
			setEmail(response.data.email);
		};

		fetchUser();
	}, []);

	const handleProfileUpdate = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem("authToken");
		try {
			const response = await axios.put(
				"http://localhost:5000/api/profile",
				{ username, email },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			alert("Profile updated");
			setUser(response.data);
		} catch (error) {
			alert("Error updating profile");
		}
	};

	if (!user) return <div>Loading...</div>;

	return (
		<div>
			<h2>User Profile</h2>
			<form onSubmit={handleProfileUpdate}>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button type="submit">Update Profile</button>
			</form>
		</div>
	);
};

export default Profile;
