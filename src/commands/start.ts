import { Context, Markup } from 'telegraf';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { InlineKeyboardMarkup } from 'telegraf/typings/telegram-types';


const start = () => async (ctx: Context) => {
  const options: ExtraReplyMessage = {
    reply_markup: Markup.inlineKeyboard([
      [
        Markup.button.callback('ثبت نام', '/day'), // First button with Persian text and command
        Markup.button.callback('Option 1', 'option_1') // Second button with English text and command
      ],
      [
        Markup.button.callback('', '/amount'), // Third button with empty text and command
        Markup.button.callback('Option 2', 'option_2') // Fourth button with English text and command
      ]
    ])
  };
  await ctx.reply(`سلام ${ctx.message?.from.first_name} خوش آمدید`, options);
};

export { start };
