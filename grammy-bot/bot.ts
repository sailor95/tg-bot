import { Bot } from 'grammy';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const bot = new Bot(process.env.TUTOR_BOT_KEY || '');

bot.command('start', async ctx => {
  // prettier-ignore
  ctx.reply('Welcome\\! \*Up\* Up \_\_and\_\_ \_running\_\\.', {
    parse_mode: 'MarkdownV2',
  });
});
bot.on('message', ctx => ctx.reply('Got another message!'));

bot.start();
