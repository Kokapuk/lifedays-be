import * as dayjs from 'dayjs';
import { Birthday } from './schemas/birthday.schema';

export const getBirthdayDateFromDate = (strDate: string): Birthday['date'] => {
  const date = dayjs(strDate);

  return { month: date.get('M') + 1, day: date.get('D') };
};
