import { Repository } from 'typeorm';
import { Product } from '../../domain/entities';
import { dataSource } from '../../config';
import { CommandHandler } from './command-handler.type';
import { logCommandHandler } from '../utils';
import { InsufficientStockError, NotFoundError } from '../errors';
import { ObjectId } from 'mongodb';
import { SellProductCommand } from './sell-product.command';

export class SellProductHandler
  implements CommandHandler<SellProductCommand, Product>
{
  private readonly productRepository: Repository<Product>;

  constructor() {
    this.productRepository = dataSource.getRepository(Product);
  }

  async execute(command: SellProductCommand) {
    logCommandHandler(command);
    const { productId, amount } = command;

    const product = await this.productRepository.findOne({
      where: { _id: new ObjectId(productId) },
    });

    if (!product) {
      throw new NotFoundError('product');
    }

    if (product.stock < amount) {
      throw new InsufficientStockError(product._id.toHexString());
    }

    product.stock -= amount;

    return await this.productRepository.save(product);
  }
}
