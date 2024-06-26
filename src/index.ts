import { session, Telegraf } from 'telegraf';
import { handleTextMessage } from './text';
import { start } from './commands';
// import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import { writeIntoDB } from './Utils/util';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);
bot.use(session());
// bot.command('about', about());
bot.command('start', start());
bot.on('text', handleTextMessage());


writeIntoDB(
  {
    RegisteredUsers: [
      { id: 79388826, uuid: 'f7d27d19-5390-420b-943f-f6289731f2a9' },
      { id: 110958425, uuid: '97a97404-bdc7-4ef3-b129-50ac32041a7e' }
    ]
  }, 'TelBot/DB.json');
// bot.on("text", (ctx) => {
//   // debugger
//   // Check if the text message is a reply to the original message
//   if (ctx.message.reply_to_message && 'message_id' in ctx.message.reply_to_message) {
//     const text = ctx.message.text;
//     ctx.reply(`You replied with: ${text}`);
//   } else {
//     ctx.reply('Please respond to the original message.');
//   }
// });


bot.action('get-configs', (ctx) => {
  ctx.reply('asdasdlaskdasldkasldkasdlkasdlkasd');
});
bot.action('option1', (ctx) => {
  ctx.reply('You clicked Option 1');
});
//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
