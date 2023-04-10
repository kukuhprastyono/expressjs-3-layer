import { PrismaClient } from '@prisma/client';
import CreateError from 'http-errors';

const prisma = new PrismaClient();

export const createOneBookCategory = async ({ name = '', slug = '' }) => {
	try {
		return await prisma.bookCategory.create({
			data: {
				name,
				slug,
			},
		});
	} catch (error) {
		return CreateError(500, { code: 500, data: null, errors: null });
	}
};

export const getManyBookCategory = async ({ page = 1, size = 10 }) => {
	try {
		return await prisma.bookCategory.findMany({
			take: size,
			skip: size * (page - 1),
		});
	} catch (error) {
		return CreateError(500, { code: 500, data: null, errors: null });
	}
};
