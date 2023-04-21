/*
 * @Author: sonic.lee 814222685@qq.com
 * @Date: 2023-04-21 15:00:18
 * @LastEditors: sonic.lee 814222685@qq.com
 * @LastEditTime: 2023-04-21 17:24:40
 * @Description:
 */
import Router from "@koa/router";
import LoginController from "../controllers/loginController";
const router = new Router();

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       userName:
 *         type: string
 *         required: true
 *         title: 用户名
 *       password:
 *         type: string
 *         required: true
 *         title: 密码
 */
/**

/**
 * @swagger
 * /register:
 *   post:
 *     summary: 注册用户
 *     description: 注册用户
 *     tags: [登录注册模块]
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       schema:
 *         $ref: "#/definitions/User"
 *     responses:
 *       200:
 *         description: 获取成功
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: string
 *
 *
 */
router.post("/register", LoginController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: 登录用户
 *     description: 登录用户
 *     tags: [登录注册模块]
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       schema:
 *         $ref: "#/definitions/User"

 *     responses:
 *       200:
 *         description: 获取成功
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: string
 *
 *
 */
router.post("/login", LoginController.login);

export default router;
