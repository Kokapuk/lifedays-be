import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { TITLE_VALIDATION } from '../validation.constants';

export type BirthdayDocument = HydratedDocument<Birthday>;

@Schema()
export class Birthday {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    minLength: TITLE_VALIDATION.minLength,
    maxLength: TITLE_VALIDATION.maxLength,
  })
  title: string;

  @Prop({
    type: { _id: false, month: Number, day: Number },
    required: true,
  })
  date: { month: number; day: number };

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', select: false })
  owner: User;
}

export const BirthdaySchema = SchemaFactory.createForClass(Birthday);
