import { ValidationError as ClassValidatorValidationError } from 'class-validator';

export class ValidationError extends Error {
  constructor(public errors: ClassValidatorValidationError) {
    super('Validation Error');
    this.name = 'ValidationError';
  }
}
