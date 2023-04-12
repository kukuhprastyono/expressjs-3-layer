import { PrismaClient } from '@prisma/client';
import CreateError from 'http-errors';
import logger from '../helper/logger.js';

const prisma = new PrismaClient();

export const createOneRole = async (data = {}) => {
	try {
		return await prisma.role.create({ data });
	} catch (error) {
		logger.error(error.message);
		return CreateError(500, { code: 500, data: null, errors: null });
	}
};
export const getOneRoleByName = async (name = '') => {
	try {
		return await prisma.role.findUnique({
			where: {
				name,
			},
		});
	} catch (error) {
		logger.error(error.message);
		return CreateError(500, { code: 500, data: null, errors: null });
	}
};
