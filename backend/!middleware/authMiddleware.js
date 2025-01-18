const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
	let token = req.headers.authorization;
	if (!token) {
		return res.status(401).send("No token, authorization denied");
	}

	token = token.split(" ")[1]; // Bearer <token>

	try {
		const decoded = jwt.verify(token, "secretKey");
		req.user = decoded.id;
		next();
	} catch (error) {
		res.status(401).send("Token is not valid");
	}
};
module.exports = protect;
