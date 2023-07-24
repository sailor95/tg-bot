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

bot.command('start', async ctx => {
  // prettier-ignore
  await ctx.reply('Welcome\\! *Up* __and__ _running_\\.', {
    parse_mode: 'MarkdownV2',
    reply_markup: {force_reply: true}
  });
});
bot.on('message:text', async ctx => {
  const withStart = await ctx.hasCommand('start');
  console.log('With command start?', withStart);

  const { isAdmin } = await (ctx as any).config;
  const text = 'Got another message!';

  // prettier-ignore
  await ctx.reply(isAdmin ? `Oh mighty <b style="color:red;">Admin</b>! ${text}` : text, {
    parse_mode: 'HTML',
  });
});

bot.on('message:photo', ctx => {
  ctx.reply('Good photo!');
});

bot.start();
