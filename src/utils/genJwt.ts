/*
 * @Author: sonic.lee 814222685@qq.com
 * @Date: 2023-04-19 16:10:13
 * @LastEditors: sonic.lee 814222685@qq.com
 * @LastEditTime: 2023-04-19 18:31:08
 * @Description:Token的生成与验证
 */
import jwt from "jsonwebtoken";
import { HttpCode } from "./HttpCode";
import TOKEN from "./config";
const { PRIVATE_KEY, EXPIRED } = TOKEN;

class Jwt {
  static generateToken(payload: string | object | Buffer) {
    const token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: EXPIRED });
    return token;
  }
  static verifyToken(token: string) {
    try {
      const realToken = token.replace(PRIVATE_KEY, "");
      let tokenInfo = jwt.verify(realToken, PRIVATE_KEY);
      return HttpCode.Success.success_ok;
    } catch (err) {
      return HttpCode.RequestError.request_error_forbidden;
    }
  }
}

export default Jwt;
