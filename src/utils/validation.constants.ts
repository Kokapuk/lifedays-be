import { ValidationArguments } from 'class-validator';

export const isNotEmptyValidationMessage = (args: ValidationArguments) =>
  `${args.property} is required`;

export const minLengthValidationMessage = (args: ValidationArguments) =>
  `${args.property} must be at least ${args.constraints[0]} characters long`;

export const maxLengthValidationMessage = (args: ValidationArguments) =>
  `${args.property} must be ${args.constraints[0]} characters long or shorter`;

export const isMongoIdValidationMessage = (args: ValidationArguments) =>
  `${args.property} is not valid mongo id`;

export const isDateValidationMessage = (args: ValidationArguments) =>
  `${args.property} is invalid date`;

export const minDateValidationMessage = (args: ValidationArguments) =>
  `${args.property} is invalid date`;
