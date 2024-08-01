import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Test {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;
}
