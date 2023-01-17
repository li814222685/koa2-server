import { Context } from 'koa';
import { Editor } from '../entity/editor';
import { getManager } from 'typeorm';

export default class EditorController {
  public static async get(ctx: Context) {
    const editorRepository = getManager().getRepository(Editor);
    const editor = await editorRepository.find();

    ctx.status = 200;
    ctx.body = editor;
  }

  public static async set(ctx: Context) {
    console.log(ctx);
    ctx.body = ctx.request.body;

    // ctx.body = 'Register controller';
  }
}
