import Joi from 'joi';

const validator = async (schema = Joi.object(), data = {}) => {
  const validate = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (validate.error) {
    return {
      value: validate.value,
      error: validate.error.details.map((detail) => ({
        message: detail.message,
        label: detail.context.label,
      })),
    };
  }
  return {
    value: validate.value,
    error: null,
  };
};

export default validator;
