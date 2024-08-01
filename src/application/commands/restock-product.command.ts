import { Command } from './command.type';

export class RestockProductCommand implements Command {
  constructor(
    public readonly productId: string,
    public readonly amount: number,
  ) {}
}
