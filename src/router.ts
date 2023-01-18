import Router from "@koa/router";

import EditorController from "./controllers/editorContoller";

const router = new Router();

// auth 相关的路由
router.get("/getEditorData", EditorController.getEditorData);
router.post("/setEditorData", EditorController.setEditorData);
router.get("/add", EditorController.add);

export default router;
