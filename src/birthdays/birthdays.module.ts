import { Module } from '@nestjs/common';
import { BirthdaysController } from './birthdays.controller';
import { BirthdaysService } from './birthdays.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Birthday, BirthdaySchema } from './schemas/birthday.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Birthday.name, schema: BirthdaySchema },
    ]),
  ],
  providers: [BirthdaysService],
  controllers: [BirthdaysController],
})
export class BirthdaysModule {}
