import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Test } from '../../domain/entities';
import dataSource from '../../config/data-source';

export class TestController {
  private readonly testRepository: Repository<Test>;
  constructor() {
    this.testRepository = dataSource.getRepository(Test);
  }

  getAll = async (req: Request, res: Response) => {
    const tests = await this.testRepository.find();

    res.json(tests);
  };

  create = async (req: Request, res: Response) => {
    const newTest = new Test();
    newTest.name = 'Some test document';

    const test = await this.testRepository.save(newTest);

    res.json(test);
  };
}
