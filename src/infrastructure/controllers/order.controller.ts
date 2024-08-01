import { Request, Response } from 'express';
import {
  CreateOrderCommand,
  CreateOrderHandler,
} from '../../application/commands';
import { CreateOrderDto } from '../dtos';
import { plainToInstance } from 'class-transformer';
import { validateDto } from '../../application/utils';

export class OrderController {
  private readonly createOrderHandler: CreateOrderHandler;

  constructor() {
    this.createOrderHandler = new CreateOrderHandler();
  }

  create = async (req: Request, res: Response) => {
    const createOrderDto = plainToInstance(CreateOrderDto, req.body);
    await validateDto(createOrderDto);

    const order = await this.createOrderHandler.execute(
      new CreateOrderCommand(
        createOrderDto.customerId,
        createOrderDto.products,
      ),
    );

    res.json(order);
  };
}
