import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { logger } from './logger';
import router from './router';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

createConnection().then(() => {
  // 初始化 Koa 应用实例
  const app = new Koa();

  // 注册中间件
  app.use(logger());
  app.use(cors());
  app.use(bodyParser());

  app.use(router.routes()).use(router.allowedMethods());

  // 响应用户请求
  app.use((ctx) => {
    ctx.body = 'Hello Koa';
  });

  // 运行服务器
  app.listen(3000);
});
