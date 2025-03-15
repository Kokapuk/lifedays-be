import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import {
  isNotEmptyValidationMessage,
  LOGIN_VALIDATION,
  maxLengthValidationMessage,
  minLengthValidationMessage,
  PASSWORD_VALIDATION,
} from '../validation.constants';

export class CreateUserDto {
  @Matches(LOGIN_VALIDATION.REGEX, {
    message: (args) =>
      `${args.property} can only contain letters, numbers and "_", "-" special characters`,
  })
  @MaxLength(LOGIN_VALIDATION.MAX_LENGTH, {
    message: maxLengthValidationMessage,
  })
  @MinLength(LOGIN_VALIDATION.MIN_LENGTH, {
    message: minLengthValidationMessage,
  })
  @IsNotEmpty({ message: isNotEmptyValidationMessage })
  login: string;

  @MaxLength(PASSWORD_VALIDATION.MAX_LENGTH, {
    message: maxLengthValidationMessage,
  })
  @MinLength(PASSWORD_VALIDATION.MIN_LENGTH, {
    message: minLengthValidationMessage,
  })
  @IsNotEmpty({ message: isNotEmptyValidationMessage })
  password: string;
}
