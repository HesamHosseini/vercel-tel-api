import { Context } from 'telegraf';
import { getAllConfigs } from '../Utils/Hiddify';
import { readFromDB } from '../Utils/util';

const getConfigs = () => {
  return async (ctx: Context) => {


    const data = await readFromDB('TelBot/DB.json');

    if (typeof (data) === 'object') {
      const users = data.RegisteredUsers;
      const foundedUser = users.find((user: { id: number; uuid: string }) => user.id === ctx.message?.from.id);

      if (foundedUser) {

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
    }

    if (data) {
    }
  };
//     const users = data.RegisteredUsers || [];

};

//
// readFromDB('TelBot/DB.json', async (error, data) => {
//   if (error) {
//     console.error(error);
//   } else {
//     debugger
//
// })
// ;


// console.log(foundedUser);


export { getConfigs };
