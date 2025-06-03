import {
  Inject,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './schemas/event.schema';
import getClosestRepeatDate from './utils/getClosestRepeatDate';
import { isISODateString } from './utils/validation.constants';
export class EventsService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectModel(Event.name) private eventModel: Model<Event>,
  ) {}

  create(dto: CreateEventDto) {
    const event = new this.eventModel({
      ...dto,
      owner: this.request['user'].sub,
    });

    return event.save();
  }

  async find(dateRange: string) {
    const [dateStart, dateEnd] = dateRange.split(';');

    if (
      !dateStart ||
      !dateEnd ||
      !isISODateString(dateStart) ||
      !isISODateString(dateEnd)
    ) {
      throw new UnprocessableEntityException(
        undefined,
        'Invalid date range provided, expected "{start date in ISO format};{end date in ISO format}"',
      );
    }

    const dayEnd = dayjs(dateEnd);
    const result: Record<string, Event[]> = {};

    const events = await this.eventModel
      .find({ owner: this.request['user'].sub })
      .sort({ date: 'ascending' });

    for (
      let day = dayjs(dateStart);
      day.isBefore(dayEnd, 'd') || day.isSame(dayEnd, 'd');
      day = day.add(1, 'd')
    ) {
      const eventsRepeatRelativeToThisDay = events.map((i) => ({
        ...i.toObject(),
        date: getClosestRepeatDate(i.date, i.repeat, day.toDate()),
      }));
      const thisDayEvents = eventsRepeatRelativeToThisDay.filter((i) =>
        dayjs(i.date).isSame(day, 'd'),
      );

      if (thisDayEvents.length) {
        result[day.toISOString()] = thisDayEvents;
      }
    }

    return result;
  }

  async update(id: string, dto: UpdateEventDto) {
    const eventExists = await this.eventModel.exists({ _id: id });

    if (!eventExists) {
      throw new NotFoundException(undefined, 'Event was not found');
    }

    return this.eventModel.findByIdAndUpdate(id, { ...dto }, { new: true });
  }
}
