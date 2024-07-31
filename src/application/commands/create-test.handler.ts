import { Repository } from 'typeorm';
import { Test } from '../../domain/entities';
import dataSource from '../../config/data-source';
import { CreateTestCommand } from './create-test.command';

export class CreateTestHandler {
  private readonly testRepository: Repository<Test>;

  constructor() {
    this.testRepository = dataSource.getRepository(Test);
  }

  async execute(command: CreateTestCommand): Promise<Test> {
    const { name } = command;

    const test = new Test();
    test.name = name;

    return await this.testRepository.save(test);
  }
}
