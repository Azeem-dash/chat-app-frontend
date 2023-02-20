import jwt from 'jsonwebtoken';

import 'dotenv/config';

const { JWT_ACCESS_SECRET } = process.env;

export const authenticate = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null || !token) return res.sendStatus(401);

	jwt.verify(token, JWT_ACCESS_SECRET, (err, user) => {
		// console.log("USER ",token,JWT_ACCESS_SECRET);
		
		if (err || !user) {
			if (err?.name === 'TokenExpiredError') {
				return res.status(401).send({ message: 'Token expired' });
			} else {
				return res.sendStatus(401);
			}
		}

		req.user = user;
		next();
	});
};