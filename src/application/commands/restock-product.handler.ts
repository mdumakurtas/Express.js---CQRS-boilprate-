import { Repository } from 'typeorm';
import { Product } from '../../domain/entities';
import { dataSource } from '../../config';
import { CommandHandler } from './command-handler.type';
import { logCommandHandler } from '../utils';
import { RestockProductCommand } from './restock-product.command';
import { NotFoundError } from '../errors';
import { ObjectId } from 'mongodb';

export class RestockProductHandler
  implements CommandHandler<RestockProductCommand, Product>
{
  private readonly productRepository: Repository<Product>;

  constructor() {
    this.productRepository = dataSource.getRepository(Product);
  }

  async execute(command: RestockProductCommand) {
    logCommandHandler(command);
    const { productId, amount } = command;

    const product = await this.productRepository.findOne({
      where: { _id: new ObjectId(productId) },
    });

    if (!product) {
      throw new NotFoundError('product');
    }

    product.stock += amount;

    return await this.productRepository.save(product);
  }
}
