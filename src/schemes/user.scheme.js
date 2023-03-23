import Joi from 'joi';

export const register = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
	passwordConfirmation: Joi.any().valid(Joi.ref('password')).required(),
	name: Joi.string().required(),
});

export const login = Joi.object({
	email: Joi.string().email(),
	password: Joi.string().min(8),
});

export const refreshToken = Joi.object({
	refreshToken: Joi.string(),
});
