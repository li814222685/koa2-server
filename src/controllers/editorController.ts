/*
 * @Author: sonic.lee 814222685@qq.com
 * @Date: 2023-01-17 16:33:55
 * @LastEditors: sonic.lee 814222685@qq.com
 * @LastEditTime: 2023-04-18 10:22:39
 * @Description:
 */
import { Context } from "koa";
import { Editor } from "../entity/editor";
import { getManager } from "typeorm";

export default class EditorController {
  public static async getEditorData(ctx: Context) {
    const editorRepository = getManager().getRepository(Editor);
    const editor = await editorRepository.findOne({ where: { id: 2 } });

    ctx.status = 200;
    ctx.body = editor;
  }

  public static async setEditorData(ctx: Context) {
    const editorRepository = getManager().getRepository(Editor);
    await editorRepository.update(2, ctx.request.body as any);
    const updatedEditor = await editorRepository.findOne({ where: { id: 2 } });
    if (updatedEditor) {
      ctx.status = 200;
      ctx.body = updatedEditor;
    } else {
      ctx.status = 404;
    }
  }

  public static async add(ctx: Context) {
    // console.log(ctx);
    const editorRepository = getManager().getRepository(Editor);
    const newEditor = new Editor();
    newEditor.data = "新数据";
    await editorRepository.save(newEditor);

    // ctx.body = 'Register controller';
  }
}
