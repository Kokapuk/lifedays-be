import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from 'src/events/schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  providers: [RemindersService],
})
export class RemindersModule {}
