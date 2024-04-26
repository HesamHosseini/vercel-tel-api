import { Context } from 'telegraf';
import axios from 'axios';
const register = () => async (ctx: Context) => {

  const chatId = ctx.chat?.id;
  const messageId = ctx.message?.message_id;
 await ctx.reply(toString(chatId ? chatId : 0)+toString(messageId ? messageId : 0))
  if (chatId && messageId) {


    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getChatHistory`,
        {
          chat_id: chatId,
          message_id: messageId,
          limit: 10, // Adjust the limit as needed
        }
      );

      const messages = response.data.result.messages;

      // Extract text from messages and send them back
      messages.forEach((message: any) => {
        if (message.text) {
          ctx.reply(message.text);
        }
      });
    } catch (error) {
      console.error('Error fetching message history:', error);
     await ctx.reply('An error occurred while fetching message history.');
    }


    // const previousMessages: string[] = ctx.telegram.getChatHistory(chatId, {
    //   limit: 10, // Adjust the limit as needed
    //   offset: messageId + 1 // Offset by the current message
    // }) || [];

  }


  const message = `wellcome to register mode `;
  // await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
  await ctx.reply(message, {});
};

export { register };