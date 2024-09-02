import { Repository } from 'typeorm';
import { Product } from '../../domain/entities';
import { dataSource } from '../../config';
import { CommandHandler } from './command-handler.type';
import { logCommandHandler } from '../utils';
import { CreateProductCommand } from './create-product.command';

export class CreateProductHandler
  implements CommandHandler<CreateProductCommand, Product>
{
  private readonly productRepository: Repository<Product>;

  constructor() {
    this.productRepository = dataSource.getRepository(Product);
  }

  async execute(command: CreateProductCommand) {
    logCommandHandler(command);
    const { name, description, stock, price } = command;

    const product = new Product();
    product.name = name;
    product.description = description;
    product.stock = stock;
    product.price = price;

    return await this.productRepository.save(product);
  }
}
