/*
 * @Author: sonic.lee 814222685@qq.com
 * @Date: 2023-01-17 16:33:55
 * @LastEditors: sonic.lee 814222685@qq.com
 * @LastEditTime: 2023-04-20 16:14:50
 * @Description:
 */
import { Context } from "koa";
import { Editor } from "../entity/editor";
import { getManager } from "typeorm";

export default class EditorController {
  public static async getEditorData(ctx: Context) {
    const editorRepository = getManager().getRepository(Editor);
    const { userId } = ctx.request.query || {};
    const result: any = await editorRepository.findOne({ where: { userId } });
    if (result) {
      //获取编辑器数据时候，取栈顶
      //每次新增一条编辑器修改记录时，也从顶部unshit
      ctx.body = { data: result.data[0]?.data || "" };
    } else {
      ctx.body = {
        data: "",
        message: "未获取到编辑器数据，先保存一份吧",
        type: "warning",
      };
    }
    ctx.status = 200;
  }

  public static async setEditorData(ctx: Context) {
    const editorRepository = getManager().getRepository(Editor);
    const { userId }: any = ctx.request.body || {};
    const result: any = await editorRepository.findOne({ where: { userId } });
    const newData = [
      {
        data: (ctx.request.body as any).data,
        time: Math.round(new Date().getTime() / 1000),
      },
      ...result.data,
    ].slice(0, 10);
    //只保留十条数据
    await editorRepository.update({ userId }, { ...result, data: newData });

    if (result) {
      ctx.status = 200;
      ctx.body = result;
    } else {
      ctx.status = 404;
    }
  }

  public static async getHistory(ctx: Context) {
    const editorRepository = getManager().getRepository(Editor);
    const { userId } = ctx.request.query || {};
    const result: any = await editorRepository.findOne({
      where: { userId },
    });
    console.log(result);
    if (result) {
      ctx.body = { data: result.data || "" };
    } else {
      ctx.body = {
        data: "",
        message: "未获取到编辑器数据历史数据",
        type: "warning",
      };
    }
    ctx.status = 200;
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
