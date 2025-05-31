import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './schemas/event.schema';

@Injectable({ scope: Scope.REQUEST })
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

  findAll() {
    return this.eventModel
      .find({ owner: this.request['user'].sub })
      .sort({ date: 'ascending' });
  }

  async update(id: string, dto: UpdateEventDto) {
    const eventExists = await this.eventModel.exists({ _id: id });

    if (!eventExists) {
      throw new NotFoundException(undefined, 'Event was not found');
    }

    return this.eventModel.findByIdAndUpdate(id, { ...dto }, { new: true });
  }
}
