/*
 * @Author: sonic.lee 814222685@qq.com
 * @Date: 2023-01-17 15:14:54
 * @LastEditors: sonic.lee 814222685@qq.com
 * @LastEditTime: 2023-04-21 17:11:43
 * @Description:
 */
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { logger } from "./logger";
import koaBody from "koa-body";
//@ts-ignore
import EditorRoute from "./routes/editor";
import UserRoute from "./routes/user";
import { createConnection } from "typeorm";
import "reflect-metadata";
import { tokenvaildate } from "./middleware/tokenvalidate";
import { koaSwagger } from "koa2-swagger-ui";
import swagger from "./utils/swagger";

createConnection().then(() => {
  // 初始化 Koa 应用实例
  const app = new Koa();

  // 注册中间件
  app.use(logger());
  app.use(cors());
  app.use(koaBody());
  app.use(tokenvaildate());
  app.use(
    koaSwagger({
      routePrefix: "/swagger", // host at /swagger instead of default /docs
      swaggerOptions: {
        url: "/swagger.json", // example path to json 其实就是之后swagger-jsdoc生成的文档地址
      },
    })
  );
  app.use(swagger.routes()).use(swagger.allowedMethods());
  app.use(EditorRoute.routes()).use(EditorRoute.allowedMethods());
  app.use(UserRoute.routes()).use(UserRoute.allowedMethods());

  // 响应用户请求

  // 运行服务器
  app.listen(3000);
});
