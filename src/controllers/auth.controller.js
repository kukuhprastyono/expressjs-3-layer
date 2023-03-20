import CreateError from 'http-errors';
import validator from '../helper/validator.js';
import * as userScheme from '../schemes/user.scheme.js';
import * as userService from '../services/auth.service.js';

export const login = async (req, res) => {
  const data = {
    ...req.body,
  };
  const validateRequest = await validator(userScheme.login, data);
  if (validateRequest.error) {
    res.send(new CreateError(422, { code: 422, data: null, errors: validateRequest.error }));
    return;
  }

  userService.login(res, validateRequest.value);
};

export const register = async (req, res) => {
  const data = {
    ...req.body,
  };
  const validateRequest = await validator(userScheme.register, data);
  if (validateRequest.error) {
    res.send(new CreateError(422, { code: 422, data: null, errors: validateRequest.error }));
    return;
  }
  delete validateRequest?.value?.passwordConfirmation;

  userService.register(res, { ...validateRequest.value });
};

// run in terminal to generate random secret
// require('crypto').randomBytes(64).toString('hex')
