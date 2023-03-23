import CreateError from 'http-errors';
import bcrypt from 'bcrypt';
import * as User from '../database/User.js';
import * as RefreshToken from '../database/RefreshToken.js';
import { generateAccessToken, generateRefreshToken } from '../helper/jwt.js';

export const login = async (res, { email = '', password = '' }) => {
	const getOneUserByEmail = await User.getOneUserByEmail(email);
	if (getOneUserByEmail?.statusCode === 500) {
		return res.send(getOneUserByEmail);
	}
	if (!getOneUserByEmail) {
		return res.send(
			new CreateError(401, { code: 401, data: null, errors: null })
		);
	}
	const compireHash = await bcrypt.compare(password, getOneUserByEmail.hash);
	if (!compireHash) {
		return res.send(
			new CreateError(401, { code: 401, data: null, errors: null })
		);
	}
	const accessToken = await generateAccessToken(
		{
			uuid: getOneUserByEmail.uuid,
			email: getOneUserByEmail.email,
			name: getOneUserByEmail.name,
		},
		{
			expiresIn: Math.floor(Date.now() / 1000) + 60 * 15, // 15 minute
		}
	);
	const refreshTokenExpire = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour in second
	const refreshToken = await generateRefreshToken(
		{
			uuid: getOneUserByEmail.uuid,
			email: getOneUserByEmail.email,
			name: getOneUserByEmail.name,
		},
		{
			expiresIn: refreshTokenExpire,
		}
	);
	const createOneRefreshToken = await RefreshToken.createOneRefreshToken({
		user: {
			connect: {
				id: getOneUserByEmail.id,
			},
		},
		token: refreshToken,
		expiredAt: new Date(refreshTokenExpire * 1000).toISOString(),
		invalidAt: null,
	});
	if (createOneRefreshToken?.statusCode === 500) {
		return res.send(createOneRefreshToken);
	}

	return res.send({
		accessToken,
		refreshToken,
	});
};

export const register = async (
	res,
	{ email = '', password = '', name = '' }
) => {
	const getOneUserByEmail = await User.getOneUserByEmail(email);
	if (getOneUserByEmail?.statusCode === 500) {
		return res.send(getOneUserByEmail);
	}
	if (getOneUserByEmail) {
		return res.send(
			new CreateError(422, {
				code: 422,
				data: null,
				errors: [
					{
						message: '"email" email already exists',
						label: 'email',
					},
				],
			})
		);
	}
	const hash = await bcrypt.hash(password, 10);
	const createOneUser = await User.createOneUser({
		email,
		hash,
		name,
	});
	if (createOneUser?.statusCode === 500) {
		return res.send(createOneUser);
	}
	delete createOneUser.id;
	delete createOneUser.hash;
	return res.send({
		message: null,
		code: 200,
		data: createOneUser,
		errors: null,
	});
};
