/* eslint-disable consistent-return */
import CreateError from 'http-errors';
import bcrypt from 'bcrypt';
import validator from '../helper/validator.js';
import * as userScheme from '../schemes/user.scheme.js';
import * as User from '../model/User.js';
import * as RefreshToken from '../model/RefreshToken.js';
import { generateAccessToken, generateRefreshToken } from '../helper/jwt.js';
import logger from '../helper/logger.js';
import * as Role from '../model/Role.js';

export const login = async (req, res) => {
	try {
		const data = {
			...req.body,
		};
		const validateRequest = await validator(userScheme.login, data);
		if (validateRequest.error) {
			res.send(
				new CreateError(422, {
					code: 422,
					data: null,
					errors: validateRequest.error,
				})
			);
		}

		const getOneUserByEmail = await User.getOneUserByEmail(data.email);
		if (getOneUserByEmail?.statusCode === 500) {
			return res.send(getOneUserByEmail);
		}
		if (!getOneUserByEmail) {
			return res.send(
				new CreateError(401, { code: 401, data: null, errors: null })
			);
		}
		const compireHash = await bcrypt.compare(
			data.password,
			getOneUserByEmail.hash
		);
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
	} catch (error) {
		logger.error(error.message);
		return res.send(
			new CreateError(500, { code: 500, data: null, errors: null })
		);
	}
};

export const register = async (req, res) => {
	try {
		const data = {
			...req.body,
		};
		const validateRequest = await validator(userScheme.register, data);
		if (validateRequest.error) {
			return res.send(
				new CreateError(422, {
					code: 422,
					data: null,
					errors: validateRequest.error,
				})
			);
		}
		const { email, password, name } = validateRequest.value;

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

		let getOneRoleByName = await Role.getOneRoleByName('customer');
		if (!getOneRoleByName) {
			getOneRoleByName = await Role.createOneRole({ name: 'customer' });
		}
		const hash = await bcrypt.hash(password, 10);
		const createOneUser = await User.createOneUser({
			email,
			hash,
			name,
			roles: {
				connect: [{ id: getOneRoleByName.id }],
			},
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
	} catch (error) {
		logger.error(error.message);
		return res.send(
			new CreateError(500, { code: 500, data: null, errors: null })
		);
	}
};

export const me = async (req, res) => res.send(req.user);
