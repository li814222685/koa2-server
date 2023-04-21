import { Context } from "koa";
import { Editor } from "../entity/editor";
import { getManager } from "typeorm";

export default class EditorController {
  /**
   * @swagger
   * /security/login: # 接口地址
   *   post: # 请求体
   *     description: 用户登入 # 接口信息
   *     tags: [用户鉴权模块] # 模块名称
   *     produces:
   *       - application/x-www-form-urlencoded # 响应内容类型
   *     parameters: # 请求参数
   *       - name: password
   *         description: 用户密码
   *         in: formData # 参数的位置，可能的值有 "query", "header", "path" 或 "cookie" 没有formData，但是我加了不报错
   *         required: true
   *         type: string
   *       - name: name
   *         description: 用户名
   *         in: formData
   *         required: true
   *         type: string # 可能的值有string、number、file（文件）等
   *     responses:
   *       '200':
   *         description: Ok
   *         schema: # 返回体说明
   *           type: 'object'
   *           properties:
   *             code:
   *               type: 'number'
   *             data:
   *               type: 'object'
   *               description: 返回数据
   *             message:
   *               type: 'string'
   *               description: 消息提示
   *       '400':
   *         description: 请求参数错误
   *       '404':
   *         description: not found
   */
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
    if (!result) {
      await editorRepository.insert({
        userId,
        data: [
          {
            data: (ctx.request.body as any).data,
            time: Math.round(new Date().getTime() / 1000),
          },
        ] as any,
      });
    } else {
      const newData = [
        {
          data: (ctx.request.body as any).data,
          time: Math.round(new Date().getTime() / 1000),
        },
        ...result?.data,
      ].slice(0, 10);
      //只保留十条数据
      await editorRepository.update({ userId }, { ...result, data: newData });
    }

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
