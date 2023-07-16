const { Telegraf } = require('telegraf');
require('dotenv').config({ path: '../.env' });

const bot = new Telegraf(process.env.TUTOR_BOT_KEY);

bot.use((ctx, next) => {
  ctx.reply('You used the bot');
  ctx.state.apple = 5;
  next(ctx);
});

bot.start(ctx => {
  ctx.reply(
    `${ctx.from.first_name} has entered the start command, good job! TYPE: ${ctx.updateType}`
  );
  ctx.reply(`${ctx.from.first_name} has ${ctx.state.apple} apples`);
});

bot.help(ctx => {
  ctx.reply('You need some help?');
});

bot.settings(ctx => {
  ctx.reply(`Let's do some setting.`);
});

bot.command(['Test', 'test'], ctx => {
  ctx.reply('Hello world!');
});

bot.hears('dog', ctx => {
  ctx.reply('Woof!! Woof!!');
});

// bot.on('text', ctx => {
//   ctx.reply('This is a text message.');
// });

// @botfather
bot.mention('botfather', ctx => {
  ctx.reply('Mention method');
});

bot.phone('+1 730 263-4233', ctx => {
  ctx.reply('Phone method');
});

// #hash
bot.hashtag('hash', ctx => {
  ctx.reply('Hashtag method');
});

bot.launch();
