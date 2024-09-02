import { ValidatorOptions } from 'class-validator';

export const validatorOptions: ValidatorOptions = {
  validationError: {
    target: false,
    value: false,
  },
};
