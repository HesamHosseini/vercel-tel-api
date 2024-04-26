import { Context } from 'telegraf';
import axios from 'axios';

require('dotenv').config();
const register = () => async (ctx: Context) => {



  const message = `wellcome to register mode `;
  // await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
  await ctx.reply(message , );
};

export { register };