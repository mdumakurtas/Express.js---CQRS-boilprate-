import { Repository } from 'typeorm';
import { Test } from '../../domain/entities';
import { GetTestsQuery } from './get-tests.query';
import { dataSource } from '../../config';
import { QueryHandler } from './query-handler.type';
import { logQueryHandler } from '../utils';

export class GetTestsHandler implements QueryHandler<GetTestsQuery, Test[]> {
  private readonly testRepository: Repository<Test>;
  constructor() {
    this.testRepository = dataSource.getRepository(Test);
  }

  async execute(query: GetTestsQuery) {
    logQueryHandler(query);

    return await this.testRepository.find();
  }
}
