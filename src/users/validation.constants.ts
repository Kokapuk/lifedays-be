import { ValidationArguments } from 'class-validator';

export const LOGIN_VALIDATION = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 32,
  REGEX: /^[A-Za-z_\-\d]+$/,
};

export const PASSWORD_VALIDATION = {
  MIN_LENGTH: 6,
  MAX_LENGTH: 128,
};

export const isNotEmptyValidationMessage = (args: ValidationArguments) =>
  `${args.property} is required`;

export const minLengthValidationMessage = (args: ValidationArguments) =>
  `${args.property} must be at least ${args.constraints[0]} characters long`;

export const maxLengthValidationMessage = (args: ValidationArguments) =>
  `${args.property} must be ${args.constraints[0]} characters long or shorter`;
