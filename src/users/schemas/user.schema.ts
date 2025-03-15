import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { LOGIN_VALIDATION } from '../validation.constants';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    minLength: LOGIN_VALIDATION.MIN_LENGTH,
    maxLength: LOGIN_VALIDATION.MAX_LENGTH,
    validate: LOGIN_VALIDATION.REGEX,
  })
  login: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({ type: String })
  telegramUserId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
