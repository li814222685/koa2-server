/*
 * @Author: sonic.lee 814222685@qq.com
 * @Date: 2023-01-17 16:33:55
 * @LastEditors: sonic.lee 814222685@qq.com
 * @LastEditTime: 2023-04-19 17:18:42
 * @Description: 登录&&注册 controller
 */
import { Context } from "koa";
import { User } from "../entity/user";
import { getManager } from "typeorm";
import validator from "validator";
import Jwt from "../utils/genJwt";

interface UserInfo {
  userName: string;
  password: string;
}

export default class LoginController {
  public static async register(ctx: Context) {
    const { userName, password } = ctx.request.body as UserInfo;

    const userRepository = getManager().getRepository(User);
    const findUser = await userRepository.find({ where: { userName } });
    LoginController.validateRegisterInfo(ctx);

    if (findUser?.length > 0) {
      ctx.body = {
        status: "warning",
        message: "用户已经存在，换个用户名吧:)",
      };
      ctx.status = 400;
      return;
    } else {
      const newUser = new User();
      newUser.userName = userName;
      newUser.password = password;

      newUser.save();
      ctx.body = {
        status: "success",
        message: "注册成功，快去登录吧！",
      };
      ctx.status = 200;
    }

    // ctx.body = editor;
  }
  public static async login(ctx: Context) {
    const { userName, password } = ctx.request.body as UserInfo;
    const findresult = await User.find({ where: { userName } });
    if (findresult.length > 0) {
      // 判断用户名 密码是不是一样
      if (
        findresult[0].userName === userName &&
        findresult[0].password === password
      ) {
        const token = Jwt.generateToken({ userInfo: { userName } });
        console.log(token);
        ctx.status = 200;
        ctx.body = { message: "登录成功", token: token, status: "success" };
      } else {
        ctx.status = 401;
        ctx.body = { message: "用户名或密码错误", status: "error" };
      }
    } else {
      ctx.status = 401;
      ctx.body = { message: "用户不存在", status: "error" };
    }
  }

  static validateRegisterInfo(ctx: Context) {
    const { userName, password } = ctx.request.body as UserInfo;
    if (!validator.isLength(userName, { min: 5, max: 10 })) {
      ctx.body = {
        status: "error",
        message: "用户名需要5位-10位!",
      };
      ctx.status = 400;
      return;
    }
    const strength = validator.isStrongPassword(password, {
      minLength: 5,
      returnScore: true,
    });
    if (strength < 20) {
      ctx.body = {
        status: "error",
        message: "密码强度过低，请尽量使用大小写字母、数字、符号。",
        strength,
      };
      ctx.status = 400;
      return;
    }
  }
}
