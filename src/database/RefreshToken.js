import { PrismaClient } from '@prisma/client';
import CreateError from 'http-errors';

const prisma = new PrismaClient();

export const createOneRefreshToken = async (data = {}) => {
	try {
		return await prisma.refreshToken.create({
			data,
		});
	} catch (error) {
		return CreateError(500, { code: 500, data: null, errors: null });
	}
};

export const getOneRefreshToken = () => {};
