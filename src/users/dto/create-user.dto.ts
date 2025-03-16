import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import {
  isNotEmptyValidationMessage,
  maxLengthValidationMessage,
  minLengthValidationMessage,
} from 'src/validation.constants';
import { LOGIN_VALIDATION, PASSWORD_VALIDATION } from '../validation.constants';

export class CreateUserDto {
  @Matches(LOGIN_VALIDATION.regex, {
    message: (args) =>
      `${args.property} can only contain letters, numbers and "_", "-" special characters`,
  })
  @MaxLength(LOGIN_VALIDATION.maxLength, {
    message: maxLengthValidationMessage,
  })
  @MinLength(LOGIN_VALIDATION.minLength, {
    message: minLengthValidationMessage,
  })
  @IsNotEmpty({ message: isNotEmptyValidationMessage })
  login: string;

  @MaxLength(PASSWORD_VALIDATION.maxLength, {
    message: maxLengthValidationMessage,
  })
  @MinLength(PASSWORD_VALIDATION.minLength, {
    message: minLengthValidationMessage,
  })
  @IsNotEmpty({ message: isNotEmptyValidationMessage })
  password: string;
}
