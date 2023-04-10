/* eslint-disable no-restricted-syntax */
import { PrismaClient } from '@prisma/client';
import logger from '../../src/helper/logger.js';

const prisma = new PrismaClient();

const main = async () => {
	const roleNames = [
		'customer',
		'shop-head',
		'warehouse-staff',
		'cashier',
		'packing-staff',
	];

	for await (const name of roleNames) {
		const upsertRole = await prisma.role.upsert({
			where: {
				name,
			},
			update: {},
			create: {
				name,
				createdAt: new Date(Date.now()).toISOString(),
				updatedAt: new Date(Date.now()).toISOString(),
			},
		});
		logger.info(upsertRole);
	}
};

export default main;
