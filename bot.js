const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.TG_KEY);

bot.start(ctx => {
  ctx.reply(
    `${ctx.from.first_name} have entered the start command, good job! ${ctx.updateType}`
  );
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

bot.use(ctx => {
  ctx.reply('You used the bot');
});

bot.launch();
