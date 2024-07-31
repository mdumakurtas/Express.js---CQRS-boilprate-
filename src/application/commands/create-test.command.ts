import { Command } from './command.type';

export class CreateTestCommand implements Command {
  constructor(public readonly name: string) {}
}
