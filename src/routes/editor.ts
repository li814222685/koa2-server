/*
 * @Author: sonic.lee 814222685@qq.com
 * @Date: 2023-04-21 15:00:10
 * @LastEditors: sonic.lee 814222685@qq.com
 * @LastEditTime: 2023-04-21 17:04:25
 * @Description:
 */
import Router from "@koa/router";

import EditorController from "../controllers/editorController";

const router = new Router();

/**
 * @swagger
 * /getEditorData:
 *   get:
 *     summary: 通过{userId}获取编辑器数据
 *     description: 通过{userId}获取编辑器数据
 *     tags: [编辑器模块]
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "query"
 *       name: "userId"
 *       description: "用户id"
 *       schema:
 *         type: number
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

router.get("/getEditorData", EditorController.getEditorData);

/**
 * @swagger
 * /setEditorData:
 *   post:
 *     summary: 通过{userId}保存编辑器数据
 *     description: 通过userId保存编辑器数据
 *     tags: [编辑器模块]
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "body"
 *       schema:
 *         type: object
 *         properties:
 *           userId:
 *             type: number
 *           data:
 *             type: string
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
router.post("/setEditorData", EditorController.setEditorData);

/**
 * @swagger
 * /getHistory:
 *   get:
 *     summary: 通过{userId}获取编辑器保存历史
 *     description: 通过{userId}获取编辑器保存历史
 *     tags: [编辑器模块]
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "query"
 *       name: "userId"
 *       description: "用户id"
 *       schema:
 *         type: number
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
router.get("/getHistory", EditorController.getHistory);

export default router;
