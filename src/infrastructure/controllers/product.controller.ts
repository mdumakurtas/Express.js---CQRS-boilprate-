import { Request, Response } from 'express';
import {
  GetProductsHandler,
  GetProductsQuery,
} from '../../application/queries';
import { CreateProductCommand } from '../../application/commands';
import {
  CreateProductDto,
  UpdateProductParamsDto,
  UpdateStockDto,
} from '../dtos';
import { plainToInstance } from 'class-transformer';
import { validateDto } from '../../application/utils';
import { CreateProductHandler } from '../../application/commands/create-product.handler';
import { RestockProductHandler } from '../../application/commands/restock-product.handler';

export class ProductController {
  private readonly getProductsHandler: GetProductsHandler;
  private readonly createProductHandler: CreateProductHandler;
  private readonly restockProductHandler: RestockProductHandler;

  constructor() {
    this.getProductsHandler = new GetProductsHandler();
    this.createProductHandler = new CreateProductHandler();
    this.restockProductHandler = new RestockProductHandler();
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

  restock = async (req: Request, res: Response) => {
    const updateStockDto = plainToInstance(UpdateStockDto, req.body);
    const updateProductParamsDto = plainToInstance(
      UpdateProductParamsDto,
      req.params,
    );

    await validateDto(updateProductParamsDto);
    await validateDto(updateStockDto);

    const product = await this.restockProductHandler.execute({
      productId: updateProductParamsDto.idProduct,
      amount: updateStockDto.amount,
    });

    res.json(product);
  };
}
