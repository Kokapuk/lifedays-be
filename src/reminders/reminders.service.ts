import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Event } from 'src/events/schemas/event.schema';
import getClosestRepeatDate from 'src/events/utils/getClosestRepeatDate';
import { Telegraf } from 'telegraf';
import { CODE_REGEX } from './utils/validation.constants';

const MINUTE_IN_MILLISECONDS = 60 * 1000;

@Injectable()
export class RemindersService implements OnModuleInit, OnModuleDestroy {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  private readonly logger = new Logger(RemindersService.name);
  private bot: Telegraf;

  onModuleInit() {
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

    this.bot.start((ctx) =>
      ctx.reply(
        `Hello! I'm official <a href='https://example.com'>Lifedays</a> telegram bot.\nSend <b>/link &lt;code></b> to link your account to telegram bot, so we can send you reminders of events.`,
        { parse_mode: 'HTML' },
      ),
    );

    this.bot.command('link', (ctx) => {
      const code = ctx.args[0];

      if (!code) {
        ctx.reply('Code was not provided.');
        return;
      }

      if (!code.match(CODE_REGEX)) {
        ctx.reply('Invalid code provided.');
        return;
      }

      ctx.reply('Linked successfully!');
    });

    this.bot.launch();
  }

  onModuleDestroy() {
    this.bot.stop();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async sendReminders() {
    const events = await this.eventModel
      .find()
      .select('+owner')
      .populate('owner');

    events.forEach((event) => {
      const closestDateRepeat = getClosestRepeatDate(
        event.date,
        event.repeat,
        new Date(),
      );
      const dateDiff = Math.abs(closestDateRepeat.getDate() - Date.now());

      if (dateDiff <= MINUTE_IN_MILLISECONDS) {
        this.logger.debug(
          `FIRE UP "${event.title}" by date "${closestDateRepeat}" and original date "${event.date}"`,
        );
      }
    });
  }
}
