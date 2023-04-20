/*
 * @Author: sonic.lee 814222685@qq.com
 * @Date: 2023-04-19 16:22:21
 * @LastEditors: sonic.lee 814222685@qq.com
 * @LastEditTime: 2023-04-20 09:32:36
 * @Description: token验证中间件
 */
import Jwt from "..//utils/genJwt";
import { HttpCode } from "../utils/HttpCode";

export const tokenvaildate = () => {
  return async function (
    ctx: {
      status: number;
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
      if (token) {
        const status = Jwt.verifyToken(token);
        if (status === HttpCode.RequestError.request_error_forbidden) {
          ctx.body = {
            code: HttpCode.RequestError.request_error_forbidden,
            message: HttpCode.RequestError.request_error_forbidden_msg,
            status: "error",
          };
          ctx.status = 403;
        } else {
          await next();
        }
      } else {
        ctx.status = 403;
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
