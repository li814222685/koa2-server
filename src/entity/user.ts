/*
 * @Author: sonic.lee 814222685@qq.com
 * @Date: 2023-04-18 10:35:49
 * @LastEditors: sonic.lee 814222685@qq.com
 * @LastEditTime: 2023-04-19 16:50:07
 * @Description:  用户Schema
 */
import { kMaxLength } from "buffer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column({
    type: "varchar",
    default: null,
  })
  userName: string;
  @Column({
    type: "varchar",
    default: null,
  })
  password: string;
}
