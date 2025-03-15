import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Telegraf } from 'telegraf';

@Injectable()
export class RemindersService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RemindersService.name);
  private bot: Telegraf;

  async onModuleInit() {
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

      if (!code.match(/\d{6}/)) {
        ctx.reply('Invalid code provided.');
        return;
      }

      ctx.reply('Linked successfully!');
    });

    await this.bot.launch();
  }

  async onModuleDestroy() {
    await this.bot.stop();
  }

  @Cron(CronExpression.EVERY_5_SECONDS, {
    timeZone: 'Europe/Kyiv',
    waitForCompletion: true,
    disabled: true,
  })
  sendReminders() {}
}
