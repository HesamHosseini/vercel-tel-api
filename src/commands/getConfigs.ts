import { Context } from 'telegraf';
import { getAllConfigs } from '../Utils/Hiddify';
import { readDB } from '../Utils/util';

const getConfigs = () => {
  debugger
  return async (ctx: Context) => {


    readDB('api/DB/DB.json', async (error, data) => {
      if (error) {
        console.error(error);
      } else {
        debugger
        const users = data.RegisteredUsers || [];
        const foundedUser = users.find((user: { id: number; uuid: string }) => user.id === ctx.message?.from.id);
        const allConfigs = await getAllConfigs(foundedUser.uuid);


        if (ctx.text === 'VIP-Plus 🔸') {
          const filteredConfigs = await allConfigs.filter((item
                                                             :
                                                             {
                                                               domain: string;
                                                               link: string;
                                                               name: 'string';
                                                               protocol: string;
                                                               security: string;
                                                             }) => (item.security !== 'reality' && item.security !== '') && item.domain === 'direct');

          for (const item of filteredConfigs) {
            await ctx.reply(
              `
              🔸 پروتوکل ${item.security} 🔸


🔗 لینک کانفیگ:
` + item.link);
//             await ctx.replyWithMarkdownV2('🔸 پروتوکل' + item.security + '   🔸' + ':   \n\n\n' + '`' + item.link + '`'+ "sssss", {parse_mode : "Markdown"});

          }


        } else if (ctx.text === 'Reality 🔹') {
          const filteredConfigs = allConfigs.filter((item
                                                       :
                                                       {
                                                         domain: string;
                                                         link: string;
                                                         name: 'string';
                                                         protocol: string;
                                                         security: string;
                                                       }) => item.security === 'reality');

          for (const item of filteredConfigs) {


            await ctx.replyWithMarkdownV2('پروتوکل ' + item.security + '   🔸' + ':   \n\n\n' + '\n`' + item.link + '`', { parse_mode: 'Markdown' });


          }
        }
      }
    })
    ;


    // console.log(foundedUser);
  };


};
export { getConfigs };
