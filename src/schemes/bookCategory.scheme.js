import Joi from 'joi';

export const createOneBookCategory = Joi.object({
	name: Joi.string(),
});

export const getManyBookCategory = Joi.object({
	page: Joi.number().positive().default(1),
	size: Joi.number().positive().default(10),
});
