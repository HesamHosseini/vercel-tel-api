import { Context } from 'telegraf';
import { readFromDB, User, writeIntoDB } from '../Utils/util';
import { getAllConfigs } from '../Utils/Hiddify';

export const registerUUID = async (ctx: Context, uuid: string) => {
  debugger


  const data = await readFromDB('TelBot/DB.json');
  if (typeof (data) === 'object') {
    const foundedIndex = data.RegisteredUsers.findIndex((item: {
      id: number | undefined,
      uuid: string
    }) => item.id === ctx.message?.from.id);

    if (foundedIndex > -1) {
      data.RegisteredUsers[foundedIndex].uuid = uuid;
      await writeIntoDB(data, 'TelBot/DB.json');


    } else {

      const newUser: User = { id: Number(ctx.message?.from.id), uuid: uuid };

      data.RegisteredUsers.push(newUser);

      await writeIntoDB(data, 'TelBot/DB.json');
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


  }

};





