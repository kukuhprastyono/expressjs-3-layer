/* eslint-disable no-restricted-syntax */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import logger from '../../src/helper/logger.js';

const prisma = new PrismaClient();

const main = async () => {
	const upsertRole = await prisma.user.upsert({
		where: {
			email: 'superadmin@gmail.com',
		},
		update: {},
		create: {
			email: 'superadmin@gmail.com',
			name: 'superadmin',
			hash: await bcrypt.hash('12', 10),
			createdAt: new Date(Date.now()).toISOString(),
			updatedAt: new Date(Date.now()).toISOString(),
			roles: {
				create: {
					name: 'superadmin',
				},
			},
		},
	});
	logger.info(upsertRole);
};

export default main;
