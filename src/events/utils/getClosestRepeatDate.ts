import * as dayjs from 'dayjs';
import { EventRepeat } from '../schemas/event.schema';

const getClosestRepeatDate = (
  date: Date,
  repeat: EventRepeat,
  relativeDate: Date,
): Date => {
  const day = dayjs(date);
  const relativeDay = dayjs(relativeDate);

  if (day.isAfter(relativeDay)) {
    return date;
  }

  switch (repeat) {
    case EventRepeat.NEVER:
      return date;
    case EventRepeat.DAILY:
      const daysDiff = Math.ceil(relativeDay.diff(day, 'd', true));
      return day.add(daysDiff, 'd').toDate();
    case EventRepeat.WEEKLY:
      const weeksDiff = Math.ceil(relativeDay.diff(day, 'w', true));
      return day.add(weeksDiff, 'w').toDate();
    case EventRepeat.ANNUALLY:
      const yearsDiff = Math.ceil(relativeDay.diff(day, 'y', true));
      return day.add(yearsDiff, 'y').toDate();
  }
};

export default getClosestRepeatDate;
