import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import {
  DESCRIPTION_VALIDATION,
  TITLE_VALIDATION,
} from '../utils/validation.constants';

export type EventDocument = HydratedDocument<Event>;

export enum EventRepeat {
  NEVER = 'never',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  ANNUALLY = 'annually',
}

@Schema()
export class Event {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    minLength: TITLE_VALIDATION.minLength,
    maxLength: TITLE_VALIDATION.maxLength,
  })
  title: string;

  @Prop({
    type: String,
    minLength: DESCRIPTION_VALIDATION.minLength,
    maxLength: DESCRIPTION_VALIDATION.maxLength,
  })
  description: string;

  @Prop({
    type: Date,
    required: true,
  })
  date: Date;

  @Prop({
    required: true,
    enum: EventRepeat,
  })
  repeat: EventRepeat;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    select: false,
  })
  owner: User;
}

export const EventSchema = SchemaFactory.createForClass(Event);
