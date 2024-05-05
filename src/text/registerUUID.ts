import { Context } from 'telegraf';
import { readDB, writeDB } from '../Utils/util';
import { getAllConfigs } from '../Utils/Hiddify';

export const registerUUID = async (ctx: Context, uuid: string) => {
  debugger

  readDB('api/DB/DB.json', async (error, jsonData) => {

    debugger

    if (error) {
      console.log('an Error happened : ', error.message);
      await ctx.reply('مشکلی پیش اومده : ' + error.message);

    } else {

      const foundedIndex = jsonData.RegisteredUsers.findIndex((item: {
        id: number | undefined,
        uuid: string
      }) => item.id === ctx.message?.from.id);
      if (foundedIndex > -1) {

        jsonData.RegisteredUsers[foundedIndex].uuid = uuid;
        writeDB(jsonData, 'api/DB/DB.json');

      } else {
        jsonData.RegisteredUsers.push(
          {
            id: ctx.message?.from.id,
            uuid: uuid
          });

        writeDB(jsonData, 'api/DB/DB.json');


      }
      const options = {
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
            ],
            // URL button
            [
              // { text: 'Open in browser', url: 'https://telegraf.js.org' }
            ]
          ]
        }
      };

      await ctx.reply('✅ آی دی شما با موفقیت برای این اکانت ثبت شد! 🎉به پنلت خوش اومدی  \n', options);

    }
  });


  // await ctx.reply(ctx.message.from.id.toString());

};





