import { Context } from 'telegraf';
import createDebug from 'debug';

import { author, name, version } from '../../package.json';

const debug = createDebug('bot:about_command');

const about = () => {

  return async (ctx: Context) => {
    const message = `*${name} ${version}*\n${author}`;
    // debug(`Triggered "about" command with message \n${message}` + "\n`inline fixed-width code`");
    await ctx.replyWithMarkdownV2(message+ "\n`inline fixed-width code`", { parse_mode: 'Markdown' });
  };


};
export { about };
