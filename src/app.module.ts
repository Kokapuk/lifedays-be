import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { RemindersModule } from './reminders/reminders.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    ScheduleModule.forRoot(),
    AuthModule,
    EventsModule,
    // RemindersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
