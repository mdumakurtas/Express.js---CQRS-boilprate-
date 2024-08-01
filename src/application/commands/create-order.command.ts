import { Command } from './command.type';
import { OrderProduct } from '../../domain/entities';

export class CreateOrderCommand implements Command {
  constructor(
    public readonly customerId: string,
    public readonly products: OrderProduct[],
  ) {}
}
