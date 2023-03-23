import CreateError from 'http-errors';
import { login, register } from '../../../src/controllers/auth.controller.js';
import * as userServiceMod from '../../../src/services/auth.service.js';
import * as validatorMod from '../../../src/helper/validator.js';

afterEach(jest.clearAllMocks);

describe('login', () => {
	it('should return error validation', async () => {
		const errorData = {
			value: [],
			error: [
				{
					message: 'message',
					label: 'label',
				},
			],
		};
		jest.spyOn(validatorMod, 'default').mockResolvedValue(errorData);
		await login(
			{
				email: 'email',
				password: 'pass',
			},
			{
				send: (response) => {
					expect(response).toEqual(new CreateError(422));
				},
			}
		);
		expect(validatorMod.default).toHaveBeenCalled();
	});

	it('should return success validation', async () => {
		const errorValidateData = {
			value: [],
			error: null,
		};
		jest.spyOn(validatorMod, 'default').mockResolvedValue(errorValidateData);

		const loginData = {
			accessToken: 'accessToken',
			refreshToken: 'refreshToken',
		};
		jest.spyOn(userServiceMod, 'login').mockResolvedValue(loginData);
		await login(
			{
				email: 'email',
				password: 'pass',
			},
			{
				send: () => {},
			}
		);
		expect(validatorMod.default).toHaveBeenCalled();
		expect(userServiceMod.login).toHaveBeenCalled();
	});
});

describe('register', () => {
	it('should return error validation', async () => {
		const errorData = {
			value: [],
			error: [
				{
					message: 'message',
					label: 'label',
				},
			],
		};
		jest.spyOn(validatorMod, 'default').mockResolvedValue(errorData);
		await register(
			{
				email: 'email',
				password: 'pass',
				passwordConfirmation: 'pass',
				name: 'name',
			},
			{
				send: (response) => {
					expect(response).toEqual(new CreateError(422));
				},
			}
		);
		expect(validatorMod.default).toHaveBeenCalled();
	});

	it('should return success validation', async () => {
		const errorValidateData = {
			value: [],
			error: null,
		};
		jest.spyOn(validatorMod, 'default').mockResolvedValue(errorValidateData);

		jest.spyOn(userServiceMod, 'register').mockResolvedValue({});
		await register(
			{
				email: 'email',
				password: 'pass',
				passwordConfirmation: 'pass',
				name: 'name',
			},
			{
				send: () => {},
			}
		);
		expect(validatorMod.default).toHaveBeenCalled();
		expect(userServiceMod.register).toHaveBeenCalled();
	});
});
