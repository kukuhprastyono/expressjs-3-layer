import CreateError from 'http-errors';
import jwt from 'jsonwebtoken';

const authenticateToken = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	const accessToken = authHeader && authHeader.split(' ')[1];
	if (!accessToken) {
		return res
			.status(401)
			.send(new CreateError(401, { code: 401, data: null, errors: null }));
	}

	try {
		const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
		req.user = user;
		return next();
	} catch (error) {
		return res
			.status(403)
			.send(new CreateError(403, { code: 403, data: null, errors: null }));
	}
};
export default authenticateToken;
