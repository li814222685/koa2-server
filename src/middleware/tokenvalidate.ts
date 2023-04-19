/*
 * @Author: sonic.lee 814222685@qq.com
 * @Date: 2023-04-19 16:22:21
 * @LastEditors: sonic.lee 814222685@qq.com
 * @LastEditTime: 2023-04-19 18:12:49
 * @Description: token验证中间件
 */
import Jwt from "..//utils/genJwt";
import { HttpCode } from "../utils/HttpCode";

export const tokenvaildate = () => {
  return async function (
    ctx: {
      req: { url: string };
      request: { header: { authorization: any } };
      body: {
        code: number;
        message: string;
        status?: "success" | "warning" | "error";
      };
    },
    next: () => any
  ) {
    if (ctx.req.url !== "/login" && ctx.req.url !== "/register") {
      const token = ctx.request.header.authorization; //从请求头的authorization属性中获取token
      console.log("token:", ctx.request.header);
      if (token) {
        const status = Jwt.verifyToken(token);
        if (status === HttpCode.RequestError.request_error_forbidden) {
          ctx.body = {
            code: HttpCode.RequestError.request_error_forbidden,
            message: HttpCode.RequestError.request_error_forbidden_msg,
            status: "error",
          };
        } else {
          await next();
        }
      } else {
        ctx.body = {
          code: HttpCode.RequestError.request_error_unauthorized,
          message: HttpCode.RequestError.request_error_unauthorized_msg,
          status: "error",
        };
      }
    } else {
      await next();
    }
  };
};
