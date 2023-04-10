import { PrismaClient } from '@prisma/client';
import CreateError from 'http-errors';
import logger from '../helper/logger.js';

const prisma = new PrismaClient();

export const createOneUser = async (
	data = { email: '', hash: '', name: '' }
) => {
	try {
		return await prisma.user.create({ data });
	} catch (error) {
		logger.error(error.message);
		return CreateError(500, { code: 500, data: null, errors: null });
	}
};

export const getOneUserByEmail = async (email = '') => {
	try {
		return await prisma.user.findUnique({
			where: {
				email,
			},
		});
	} catch (error) {
		logger.error(error.message);
		return CreateError(500, { code: 500, data: null, errors: null });
	}
};
