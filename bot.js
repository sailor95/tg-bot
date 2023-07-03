const Tg = require('telegraf');
require('dotenv').config();

const bot = new Tg(process.env.TG_KEY);

bot.launch();
