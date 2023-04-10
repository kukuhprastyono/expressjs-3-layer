import { PrismaClient } from '@prisma/client';
import CreateError from 'http-errors';
import logger from '../helper/logger.js';

const prisma = new PrismaClient();

export const createOneRefreshToken = async (data = {}) => {
	try {
		return await prisma.refreshToken.create({
			data,
		});
	} catch (error) {
		logger.error(error.message);
		return CreateError(500, { code: 500, data: null, errors: null });
	}
};

export const getOneRefreshToken = () => {};
