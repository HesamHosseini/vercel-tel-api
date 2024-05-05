import { Context } from 'telegraf';
import { registerUUID } from './registerUUID';
import { GetInfo } from '../commands/GetInfo';
import { start } from '../commands';
import { getConfigs } from '../commands/getConfigs';


const handleTextMessage = () => async (ctx: Context) => {

  const messageText: string = ctx.text || '';

  if (messageText) {

    const regex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
    const checkValidUUID = regex.test(messageText);
    if (checkValidUUID) {

      // go on and register the user uuid for this user and then reply with "registration complete" with keyboard
      await registerUUID(ctx, messageText);

    } else {
      switch (messageText) {
        case 'زمان باقی مانده ⏳':
          await GetInfo()(ctx);
          break;
        case 'حجم باقی مانده 📊':
          await GetInfo()(ctx);
          break;
        case 'دریافت کانفیگ 🚀' :

          const message: string = `
          🌟 به قسمت کانفیگ ها خوش اومدی: 🌟
اینجا می‌تونی از دو دسته کانفیگ استفاده کنی:



🔹 سری اول کانفیگ‌های Reality که سرعت بیشتر و امنیت بالاتری دارن اما ممکنه با بعضی از پلتفورم‌ها مثل اسپاتیفای همخوانی نداشته باشن.



🔸 سری دوم کانفیگ‌های VIP-Plus که سرعت مقداری پایین‌تر دارن ولی بر روی همه پلتفورم‌ها کار می‌کنن.
          `;
          await ctx.reply(message, {
            reply_markup: {

              keyboard: [
                // Inline buttons (2 side-by-side)
                [
                  { text: 'Reality 🔹' },
                  { text: 'VIP-Plus 🔸' }
                ],
                [{
                  text: ' 🏠  صفحه اصلی '
                }]
              ]
            }
          });
          break;
        case 'VIP-Plus 🔸':
          await getConfigs()(ctx);
          break;
        case 'Reality 🔹':
          await getConfigs()(ctx);
          break;
        case '🏠  صفحه اصلی':

          await ctx.reply('بازگشت به منوی اصلی 🏠', {
            reply_markup: {

              keyboard: [
                // Inline buttons (2 side-by-side)
                [
                  { text: 'حجم باقی مانده 📊' },
                  { text: 'زمان باقی مانده ⏳' }
                ],
                // One button
                [
                  { text: 'دریافت کانفیگ 🚀' },
                  { text: 'تغییر ای دی ♻️' }
                ]
              ]
            }
          });

          // await getConfigs()(ctx);
          break;
        case 'تغییر ای دی ♻️' :
          await start()(ctx);
          break;

        default :
          await ctx.reply(`
🥲 ببخشید، متوجه منظورت نمی‌شم. لطفا از دکمه‌ها یا دستورهای پیشفرض استفاده کن. 🛠️
      `);
          break;
      }

    }


  }


};


export { handleTextMessage };





