/*
 * @Author: sonic.lee 814222685@qq.com
 * @Date: 2023-01-17 16:28:10
 * @LastEditors: sonic.lee 814222685@qq.com
 * @LastEditTime: 2023-04-19 16:50:38
 * @Description:router
 */
import Router from "@koa/router";

import EditorController from "./controllers/editorController";
import LoginController from "./controllers/loginController";

const router = new Router();

// auth 相关的路由
router.get("/getEditorData", EditorController.getEditorData);
router.post("/setEditorData", EditorController.setEditorData);
router.get("/add", EditorController.add);
router.post("/register", LoginController.register);
router.post("/login", LoginController.login);

export default router;
