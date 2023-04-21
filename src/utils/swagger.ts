/*
 * @Author: sonic.lee 814222685@qq.com
 * @Date: 2023-04-21 14:12:14
 * @LastEditors: sonic.lee 814222685@qq.com
 * @LastEditTime: 2023-04-21 17:39:41
 * @Description:
 */
import Router from "@koa/router";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import os from "os";

const Swagger = new Router();
const swaggerDefinition = {
  info: {
    title: "CK编辑器后台API",
    version: "1.0.0",
    description: "API",
  },
  host: `${os.hostname()}:3000`,
  basePath: "/", // Base path (optional)
  paths: {},
  securityDefinitions: {
    api_key: {
      type: "apiKey",
      name: "api_key",
      in: "header",
    },
    user_auth: {
      type: "oauth2",
      flow: "implicit",
      scopes: {
        secrect: "    ",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "../routes/*.ts")], // 写有注解的router的存放地址
};

const swaggerSpec = swaggerJSDoc(options);

// 通过路由获取生成的注解文件
Swagger.get("/swagger.json", async function (ctx: any) {
  ctx.set("Content-Type", "application/json");
  ctx.body = swaggerSpec;
});

export default Swagger;
