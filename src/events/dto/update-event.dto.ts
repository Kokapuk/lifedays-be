import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsHexColor,
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

export class UpdateEventDto {
  @MaxLength(TITLE_VALIDATION.maxLength, {
    message: maxLengthValidationMessage,
  })
  @MinLength(TITLE_VALIDATION.minLength, {
    message: minLengthValidationMessage,
  })
  @IsOptional()
  title?: string;

  @MaxLength(DESCRIPTION_VALIDATION.maxLength, {
    message: maxLengthValidationMessage,
  })
  @MinLength(DESCRIPTION_VALIDATION.minLength, {
    message: minLengthValidationMessage,
  })
  @IsOptional()
  description?: string;

  @MinDate(new Date(), { message: minDateValidationMessage })
  @IsDate({ message: isDateValidationMessage })
  @Transform(({ value }) => value && new Date(value))
  @IsOptional()
  date?: Date;

  @IsHexColor()
  @IsOptional()
  color?: string;

  @IsEnum(EventRepeat)
  @IsOptional({ message: isNotEmptyValidationMessage })
  repeat?: EventRepeat;
}
