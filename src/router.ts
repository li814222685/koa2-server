import Router from '@koa/router';

import EditorController from './controllers/editorContoller';

const router = new Router();

// auth 相关的路由
router.get('/get', EditorController.get);
router.post('/set', EditorController.set);

export default router;
