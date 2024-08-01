import { registerDecorator, ValidationOptions } from 'class-validator';
import { ObjectId } from 'mongodb';

export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          // Check if the value is an instance of ObjectId or a valid 24-character hex string
          return (
            ObjectId.isValid(value) &&
            (value instanceof ObjectId ||
              (typeof value === 'string' && /^[a-fA-F0-9]{24}$/.test(value)))
          );
        },
        defaultMessage() {
          return 'Invalid ObjectId (must be a 24-character hex string)';
        },
      },
    });
  };
}
