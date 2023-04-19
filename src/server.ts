/*
 * @Author: sonic.lee 814222685@qq.com
 * @Date: 2023-01-17 15:14:54
 * @LastEditors: sonic.lee 814222685@qq.com
 * @LastEditTime: 2023-04-19 16:28:03
 * @Description:
 */
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { logger } from "./logger";
import koaBody from "koa-body";
import router from "./router";
import { createConnection } from "typeorm";
import "reflect-metadata";
import { tokenvaildate } from "./middleware/tokenvalidate";

createConnection().then(() => {
  // 初始化 Koa 应用实例
  const app = new Koa();

  // 注册中间件
  app.use(logger());
  app.use(cors());
  app.use(koaBody());
  app.use(tokenvaildate());

  app.use(router.routes()).use(router.allowedMethods());

  // 响应用户请求
  app.use((ctx) => {
    ctx.body = "OK";
  });

  // 运行服务器
  app.listen(3000);
});
