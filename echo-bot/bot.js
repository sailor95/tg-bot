const { Telegraf } = require('telegraf');
require('dotenv').config({ path: '../.env' });

const bot = new Telegraf(process.env.ECHO_BOT_KEY);

const HELP_MSG = `
Hi human:

/start - start the bot
/help - command reference
/echo - echo what you said
`;

bot.use((ctx, next) => {
  console.log(`${ctx.from.username}: ${ctx.message.text}`);
  next();
});

bot.start(ctx => {
  ctx.reply(`Hi, I'm echo bot!`);
  ctx.reply(HELP_MSG);
});

bot.help(ctx => {
  ctx.reply(HELP_MSG);
});

bot.command('echo', ctx => {
  let input = ctx.message.text;
  let inputArr = input.split(' ');

  let message = '';

  if (inputArr.length == 1) {
    message = 'You said echo';
  } else {
    inputArr.shift();
    message = inputArr.join(' ');
  }

  ctx.reply(message);
});

bot.launch();
