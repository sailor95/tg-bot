import {
  Bot,
  Context,
  GrammyError,
  HttpError,
  Composer,
  BotError,
  NextFunction,
} from 'grammy';
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
  console.log('Middleware X');
  (ctx as MyContext).config = {
    isAdmin: `${ctx.from?.id}` === process.env.UID,
  };
  await next();
});

const composer = new Composer();
composer.use(async (ctx, next) => {
  console.log('Middleware A');
  await next();
});
composer.use(async (ctx, next) => {
  console.log('Middleware B');
  await next();
});

// Q stand for other middleware
bot.errorBoundary(boundaryHandler /** , Q */).use(composer);

/**
 * Error in Q, A, or B
 */
async function boundaryHandler(err: BotError, next: NextFunction) {
  // Run middleware at C in case of error
  await next();
}

bot.use(async (ctx, next) => {
  console.log('Middleware C');
  await next();
});

bot.catch(errorHandler);

/**
 * Error in X or C
 */
function errorHandler(err: BotError) {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    console.error('Could not contact Telegram:', e);
  } else {
    console.error('Unknown error:', e);
  }
}

bot.api.setMyCommands([
  { command: 'start', description: 'Start the bot' },
  { command: 'help', description: 'Show help text' },
  { command: 'love', description: '{A} loves {B}' },
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
\\- /love: \_\\{A\\}\_ loves \_\\{B\\}\_
  `;

  ctx.reply(text, {
    parse_mode: 'MarkdownV2',
  });
});

bot.command('love', ctx => {
  const item = ctx.match;
  ctx.reply(
    `${item.split(' ')[0]} loves \|\|${item
      .split(' ')
      .splice(1)
      .join(' ')}\|\|`,
    { parse_mode: 'MarkdownV2' }
  );
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
