const { Telegraf } = require('telegraf');
require('dotenv').config({ path: '../.env' });

const bot = new Telegraf(process.env.ECHO_BOT_KEY);

const HELP_MSG = `
Hi human:

/start - start the bot
/help - command reference
`;

bot.start(ctx => {
  ctx.reply(`Hi, I'm echo bot!`);
  ctx.reply(HELP_MSG);
});

bot.help(ctx => {
  ctx.reply(HELP_MSG);
});

bot.launch();
