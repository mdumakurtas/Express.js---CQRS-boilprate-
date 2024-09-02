import { Command } from './command.type';

export class SellProductCommand implements Command {
  constructor(
    public readonly productId: string,
    public readonly amount: number,
  ) {}
}
