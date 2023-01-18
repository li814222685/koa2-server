import { kMaxLength } from "buffer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Editor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: "json",
  })
  data: string;
}
