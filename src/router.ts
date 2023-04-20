/*
 * @Author: sonic.lee 814222685@qq.com
 * @Date: 2023-01-17 16:28:10
 * @LastEditors: sonic.lee 814222685@qq.com
 * @LastEditTime: 2023-04-20 14:37:34
 * @Description:router
 */
import Router from "@koa/router";

import EditorController from "./controllers/editorController";
import LoginController from "./controllers/loginController";

const router = new Router();

router.get("/getEditorData", EditorController.getEditorData);
router.post("/setEditorData", EditorController.setEditorData);
router.get("/getHistory", EditorController.getHistory);
router.get("/add", EditorController.add);

// auth 相关的路由
router.post("/register", LoginController.register);
router.post("/login", LoginController.login);

export default router;
