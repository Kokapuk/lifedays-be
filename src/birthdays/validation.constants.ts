import { ValidationArguments } from 'class-validator';

export const TITLE_VALIDATION = {
  minLength: 1,
  maxLength: 64,
};

export const isDateValidationMessage = (args: ValidationArguments) =>
  `${args.property} is invalid date`;
