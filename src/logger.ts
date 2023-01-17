import { Context } from 'koa';
const chalk = require('chalk');

export const logger = () => {
  return async (ctx: Context, next: () => Promise<void>) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    const success = chalk.green;
    const info = chalk.blue.bold;
    const url = chalk.green.underline;
    const [_method, _url, _status, _ms] = [ctx.method, ctx.url, ctx.status, ms].map((c, i) => {
      return i == 1 ? url(c) : success(c);
    });
    console.log(
      `${info('Method:')}${_method} ${info('path：')}${_url} ${info('Code：')}${_status} - ${info(
        'waitTime：',
      )}${_ms}ms`,
    );
  };
};
