import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Test {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;
}
