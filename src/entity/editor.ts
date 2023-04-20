/*
 * @Author: sonic.lee 814222685@qq.com
 * @Date: 2023-01-17 17:30:43
 * @LastEditors: sonic.lee 814222685@qq.com
 * @LastEditTime: 2023-04-20 12:38:06
 * @Description:编辑器数据相关schema
 */
import { kMaxLength } from "buffer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Editor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: "userId",
    type: "int",
  })
  userId: number;
  @Column({
    type: "json",
  })
  data: string;
}
