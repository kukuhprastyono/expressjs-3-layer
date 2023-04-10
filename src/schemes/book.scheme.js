import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

export const getManyBook = Joi.object({
	page: Joi.number().positive().default(1),
	size: Joi.number().positive().default(10),
});

export const createOneBook = Joi.object({
	publisherUuid: Joi.string().guid(),
	name: Joi.string(),
	description: Joi.string(),
	numberOfPage: Joi.number(),
	publishedAt: Joi.date().format('DD-MM-YYYY'),
	isbn: Joi.string(),
	language: Joi.string(),
	weightInGr: Joi.number().precision(2),
	widthInCm: Joi.number().precision(2),
	heightInCm: Joi.number().precision(2),
	thicknessInCm: Joi.number().precision(2),
	bookCategoriesUuid: Joi.array().items(Joi.string().guid()),
	authorsUuid: Joi.array().items(Joi.string().guid()),
});

export const getOneBook = Joi.object({
	uuid: Joi.string().guid(),
});
