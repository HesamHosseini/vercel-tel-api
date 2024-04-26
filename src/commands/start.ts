import { Context, Markup } from 'telegraf';


const start = () => async (ctx: Context) => {



  const options = {
    reply_markup: Markup.inlineKeyboard([
      Markup.button.callback('ثبت نام', '/day'),
      Markup.button.callback('', '/amount')
    ])
  }
  await ctx.reply(`سلام ${ctx.message?.from.first_name} خوش اومدی ` , );


};

export { start };