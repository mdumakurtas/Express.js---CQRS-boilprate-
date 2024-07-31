import { Repository } from 'typeorm';
import { Test } from '../../domain/entities';
import dataSource from '../../config/data-source';
import { GetTestsQuery } from './get-tests.query';

export class GetTestsHandler {
  private readonly testRepository: Repository<Test>;
  constructor() {
    this.testRepository = dataSource.getRepository(Test);
  }

  async execute(query: GetTestsQuery): Promise<Test[]> {
    return await this.testRepository.find();
  }
}
