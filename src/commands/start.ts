import { Context, Markup } from 'telegraf';


const start = () => async (ctx: Context) => {


  const welcomeText = `سلام ${ctx.message?.from.first_name} 👋 به ربات گوگولی وی پی ان خوش اومدی! 



لطفاً id که از فروشنده دریافت کردی رو برام بفرست.


`;
// await  ctx.setChatMenuButton({
//   // web_app: { url : "https://google.com" },
//   type: 'commands'
// })
   await ctx.reply(welcomeText );

  };


export { start };
