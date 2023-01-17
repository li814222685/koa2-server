import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Editor {
  @PrimaryColumn()
  data: string;
}
