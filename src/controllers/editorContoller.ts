import { Context } from "koa";
import { Editor } from "../entity/editor";
import { getManager } from "typeorm";

export default class EditorController {
  public static async getEditorData(ctx: Context) {
    const editorRepository = getManager().getRepository(Editor);
    const editor = await editorRepository.findOne({ where: { id: 1 } });

    ctx.status = 200;
    ctx.body = editor;
  }

  public static async setEditorData(ctx: Context) {
    const editorRepository = getManager().getRepository(Editor);
    await editorRepository.update(1, ctx.request.body as any);
    const updatedEditor = await editorRepository.findOne({ where: { id: 1 } });
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
