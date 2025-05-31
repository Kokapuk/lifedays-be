import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinDate,
  MinLength,
} from 'class-validator';
import {
  isDateValidationMessage,
  isNotEmptyValidationMessage,
  maxLengthValidationMessage,
  minDateValidationMessage,
  minLengthValidationMessage,
} from 'src/utils/validation.constants';
import { EventRepeat } from '../schemas/event.schema';
import {
  DESCRIPTION_VALIDATION,
  TITLE_VALIDATION,
} from '../utils/validation.constants';

export class CreateEventDto {
  @MaxLength(TITLE_VALIDATION.maxLength, {
    message: maxLengthValidationMessage,
  })
  @MinLength(TITLE_VALIDATION.minLength, {
    message: minLengthValidationMessage,
  })
  @IsNotEmpty({ message: isNotEmptyValidationMessage })
  title: string;

  @MaxLength(DESCRIPTION_VALIDATION.maxLength, {
    message: maxLengthValidationMessage,
  })
  @MinLength(DESCRIPTION_VALIDATION.minLength, {
    message: minLengthValidationMessage,
  })
  @IsOptional()
  description: string;

  @MinDate(new Date(), { message: minDateValidationMessage })
  @IsDate({ message: isDateValidationMessage })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty({ message: isNotEmptyValidationMessage })
  date: Date;

  @IsEnum(EventRepeat)
  @IsNotEmpty({ message: isNotEmptyValidationMessage })
  repeat: EventRepeat;
}
