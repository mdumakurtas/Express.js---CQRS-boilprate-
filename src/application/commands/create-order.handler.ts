import { QueryRunner, Repository } from 'typeorm';
import { Order, Product } from '../../domain/entities';
import { dataSource } from '../../config';
import { CommandHandler } from './command-handler.type';
import { logCommandHandler } from '../utils';
import { CreateOrderCommand } from './create-order.command';
import { ObjectId } from 'mongodb';
import { InsufficientStockError, NotFoundError } from '../errors';

export class CreateOrderHandler
  implements CommandHandler<CreateOrderCommand, Order | void>
{
  private readonly productRepository: Repository<Product>;
  private queryRunner: QueryRunner;

  constructor() {
    this.productRepository = dataSource.getRepository(Product);
  }

  private async startTransaction() {
    this.queryRunner = dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async execute(command: CreateOrderCommand) {
    logCommandHandler(command);

    // Fetch products and check stock
    const products = await Promise.all(
      command.products.map(async (p) => {
        const product = await this.productRepository.findOneBy({
          _id: new ObjectId(p.productId),
        });

        if (!product) {
          throw new NotFoundError('product', p.productId);
        }

        if (product.stock < p.amount) {
          throw new InsufficientStockError(p.productId);
        }

        return { product, amount: p.amount };
      }),
    );

    await this.startTransaction();
    let updatedOrder: Order;

    try {
      // Decrease stock
      for (const { product, amount } of products) {
        await this.queryRunner.manager.update(
          Product,
          { _id: product._id },
          {
            stock: product.stock - amount,
          },
        );
      }

      // Create order
      const order = new Order();
      order.customerId = command.customerId;
      order.products = command.products;

      updatedOrder = await this.queryRunner.manager.save(order);

      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await this.queryRunner.release();
    }

    return updatedOrder;
  }
}
