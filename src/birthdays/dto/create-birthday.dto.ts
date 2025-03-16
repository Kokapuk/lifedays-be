import { IsDateString, IsNotEmpty } from 'class-validator';
import { isNotEmptyValidationMessage } from 'src/validation.constants';
import { isDateValidationMessage } from '../validation.constants';

export class CreateBirthdayDto {
  @IsNotEmpty({ message: isNotEmptyValidationMessage })
  title: string;

  @IsDateString(undefined, { message: isDateValidationMessage })
  @IsNotEmpty({ message: isNotEmptyValidationMessage })
  date: string;
}
