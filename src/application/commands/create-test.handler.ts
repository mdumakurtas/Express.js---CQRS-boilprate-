import { Repository } from 'typeorm';
import { Test } from '../../domain/entities';

import { CreateTestCommand } from './create-test.command';
import { dataSource } from '../../config';
import { CommandHandler } from './command-handler.type';
import { logCommandHandler } from '../utils';

export class CreateTestHandler
  implements CommandHandler<CreateTestCommand, Test>
{
  private readonly testRepository: Repository<Test>;

  constructor() {
    this.testRepository = dataSource.getRepository(Test);
  }

  async execute(command: CreateTestCommand) {
    logCommandHandler(command);
    const { name } = command;

    const test = new Test();
    test.name = name;

    return await this.testRepository.save(test);
  }
}
