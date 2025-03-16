import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { isNotEmptyValidationMessage } from 'src/validation.constants';
import { isDateValidationMessage } from '../validation.constants';

export class UpdateBirthdayDto {
  @IsNotEmpty({ message: isNotEmptyValidationMessage })
  @IsOptional()
  title: string;

  @IsDateString(undefined, { message: isDateValidationMessage })
  @IsNotEmpty({ message: isNotEmptyValidationMessage })
  @IsOptional()
  date: string;
}
