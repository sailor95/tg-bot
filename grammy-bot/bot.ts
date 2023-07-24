import { Bot, Context } from 'grammy';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const bot = new Bot(process.env.TUTOR_BOT_KEY || '');

interface ContextFlavor<S> {
  config: {
    isAdmin: S;
  };
}

type MyContext = Context & ContextFlavor<boolean>;

/**
 * Custom middleware
 */
bot.use(async (ctx, next) => {
  (ctx as MyContext).config = {
    isAdmin: `${ctx.from?.id}` === process.env.UID,
  };
  await next();
});

bot.api.setMyCommands([
  { command: 'start', description: 'Start the bot' },
  { command: 'help', description: 'Show help text' },
]);

bot.command('start', async ctx => {
  // prettier-ignore
  await ctx.reply('Welcome\\! *Up* __and__ _running_\\.', {
    parse_mode: 'MarkdownV2',
    reply_markup: {force_reply: true}
  });
});

bot.command('help', ctx => {
  const text = `
  Welcome\\!

Here is all the commands:

\\- /start: Start the bot
\\- /help: Show hints
  `;

  ctx.reply(text, {
    parse_mode: 'MarkdownV2',
  });
});

bot.on('message:text').filter(
  async ctx => {
    const { isAdmin } = await (ctx as any).config;
    return isAdmin;
  },
  async ctx => {
    await ctx.reply(
      'Oh mighty <b style="color:red;">Admin</b> sent a message!',
      {
        parse_mode: 'HTML',
      }
    );
  }
);

bot.on('message:text', async ctx => {
  const withStart = await ctx.hasCommand('start');
  console.log('With command start?', withStart);

  await ctx.reply('Just a message');
});

bot.on('message:photo', ctx => {
  ctx.reply('Good photo!');
});

bot.start();
