import { Command } from './command.type';

export class CreateProductCommand implements Command {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly stock: number,
  ) {}
}
