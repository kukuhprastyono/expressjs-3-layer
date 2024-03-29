import { PrismaClient } from '@prisma/client';
import roleSeed from './role.seed.js';
import userSeed from './user.seed.js';
import logger from '../../src/helper/logger.js';

const prisma = new PrismaClient();
const main = async () => {
	await roleSeed();
	await userSeed();
};
main()
	.then(async () => {
		await prisma.$disconnect;
	})
	.catch(async (error) => {
		logger.error(error.message);
		await prisma.$disconnect;
		process.exit(1);
	});
