import jwt from 'jsonwebtoken';

export const generateAccessToken = async (
	user = { uuid: '', email: '', name: '' },
	options = {}
) =>
	jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		...options,
	});

export const generateRefreshToken = async (
	user = { uuid: '', email: '', name: '' },
	options = {}
) =>
	jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
		...options,
	});
