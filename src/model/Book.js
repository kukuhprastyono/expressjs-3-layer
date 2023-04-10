import { PrismaClient } from '@prisma/client';
import CreateError from 'http-errors';

const prisma = new PrismaClient();

export const getManyBook = async (
	data = {
		page: 1,
		size: 10,
	}
) => {
	try {
		return await prisma.book.findMany({
			skip: data.size * (data.page - 1),
			take: data.size,
		});
	} catch (error) {
		return CreateError(500, { code: 500, data: null, errors: null });
	}
};

export const getOneBook = async ({ id }) => {
	try {
		return await prisma.book.findUnique({
			where: {
				id,
			},
		});
	} catch (error) {
		return CreateError(500, { code: 500, data: null, errors: null });
	}
};
