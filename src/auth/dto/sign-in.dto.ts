import { IsNotEmpty } from 'class-validator';
import { isNotEmptyValidationMessage } from 'src/validation.constants';

export class SignInDto {
  @IsNotEmpty({ message: isNotEmptyValidationMessage })
  login: string;

  @IsNotEmpty({ message: isNotEmptyValidationMessage })
  password: string;
}
