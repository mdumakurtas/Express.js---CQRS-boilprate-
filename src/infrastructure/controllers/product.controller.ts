import { Request, Response } from 'express';
import {
  GetProductsHandler,
  GetProductsQuery,
} from '../../application/queries';
import { CreateProductCommand } from '../../application/commands';
import { CreateProductDto } from '../dtos';
import { plainToInstance } from 'class-transformer';
import { validateDto } from '../../application/utils';
import { CreateProductHandler } from '../../application/commands/create-product.handler';

export class ProductController {
  private readonly getProductsHandler: GetProductsHandler;
  private readonly createProductHandler: CreateProductHandler;

  constructor() {
    this.getProductsHandler = new GetProductsHandler();
    this.createProductHandler = new CreateProductHandler();
  }

  getAll = async (req: Request, res: Response) => {
    const products = await this.getProductsHandler.execute(
      new GetProductsQuery(),
    );

    res.json(products);
  };

  create = async (req: Request, res: Response) => {
    const createProductDto = plainToInstance(CreateProductDto, req.body);
    await validateDto(createProductDto);

    const product = await this.createProductHandler.execute(
      new CreateProductCommand(
        createProductDto.name,
        createProductDto.description,
        createProductDto.price,
        createProductDto.stock,
      ),
    );

    res.json(product);
  };
}
