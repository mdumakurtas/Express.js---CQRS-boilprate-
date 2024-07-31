import { validateOrReject } from 'class-validator';
import { ValidationError } from '../errors';
import { validatorOptions } from '../../config';
import { ValidationError as ClassValidatorValidationError } from 'class-validator/types/validation/ValidationError';

export const validateDto = async (dto: object) => {
  try {
    await validateOrReject(dto, validatorOptions);
  } catch (errors) {
    throw new ValidationError(errors as ClassValidatorValidationError);
  }
};
