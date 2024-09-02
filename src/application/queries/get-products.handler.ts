import { Repository } from 'typeorm';
import { Product } from '../../domain/entities';
import { dataSource } from '../../config';
import { QueryHandler } from './query-handler.type';
import { logQueryHandler } from '../utils';
import { GetProductsQuery } from './get-products.query';

export class GetProductsHandler
  implements QueryHandler<GetProductsQuery, Product[]>
{
  private readonly productRepository: Repository<Product>;
  constructor() {
    this.productRepository = dataSource.getRepository(Product);
  }

  async execute(query: GetProductsQuery): Promise<Product[]> {
    logQueryHandler(query);

    return await this.productRepository.find();
  }
}
