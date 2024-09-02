import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

export class OrderProduct {
  @Column()
  productId: string;

  @Column()
  amount: number;

  constructor(productId: string, amount: number) {
    this.productId = productId;
    this.amount = amount;
  }
}

@Entity()
export class Order {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  customerId: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Column((type) => OrderProduct)
  products: OrderProduct[];
}
