import { Context } from 'telegraf';
import { getAllConfigs, getAllInfo } from '../Utils/Hiddify';
import { readFromDB } from '../Utils/util';


const GetInfo = () => {

  return async (ctx: Context) => {

    interface ProfileInfo {
      admin_message_html: string;
      admin_message_url: string;
      brand_icon_url: string;
      brand_title: string;
      doh: string;
      lang: string;
      profile_remaining_days: number;
      profile_reset_days: number;
      profile_title: string;
      profile_url: string;
      profile_usage_current: number;
      profile_usage_total: number;
      speedtest_enable: boolean;
      telegram_bot_url: string;
      telegram_id: number;
      telegram_proxy_enable: boolean;
    }

    // readFromDB('TelBot/DB.json', async (error, data) => {
    //   if (error) {
    //     console.error(error);
    //   } else {
    //     const users = data.RegisteredUsers || [];
    //     const foundedUser = users.find((user: { id: number; uuid: string }) => user.id === ctx.message?.from.id);
    //     const allInformation: ProfileInfo = await getAllInfo(foundedUser.uuid);
    //
    //     let message: string = '';
    //
    //     if (ctx.text === 'زمان باقی مانده ⏳') {
    //       message = 'روز های باقی مانده: ' + '\n\n' + allInformation.profile_remaining_days.toLocaleString('fa-IR') + ' روز';
    //
    //     } else if (ctx.text === 'حجم باقی مانده 📊') {
    //       message = 'حجم کلی پلن شما :   ' + allInformation.profile_usage_total + 'GB' + '\n\n' + 'حجم مصرف شده : ' + allInformation.profile_usage_current + 'GB' + '\n\n' + 'حجم باقی مانده شما : ' + (allInformation.profile_usage_total - allInformation.profile_usage_current) + 'GB';
    //     }
    //     await ctx.reply(message);
    //   }
    // });


    // console.log(foundedUser);
  };


};
export { GetInfo };
