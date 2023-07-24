"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
const bot = new grammy_1.Bot(process.env.TUTOR_BOT_KEY || '');
bot.command('start', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    ctx.reply('Welcome! Up and running.');
    const from = yield ((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.from);
    console.log(from);
}));
bot.on('message', c => c.reply('Got another message!'));
bot.start();
