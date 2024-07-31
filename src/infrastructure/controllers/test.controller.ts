import { Request, Response } from 'express';
import { GetTestsHandler } from '../../application/queries/get-tests.handler';
import { GetTestsQuery } from '../../application/queries/get-tests.query';
import { CreateTestHandler } from '../../application/commands/create-test.handler';
import { CreateTestCommand } from '../../application/commands/create-test.command';

export class TestController {
  private readonly getTestHandler: GetTestsHandler;
  private readonly createTestHandler: CreateTestHandler;

  constructor() {
    this.getTestHandler = new GetTestsHandler();
    this.createTestHandler = new CreateTestHandler();
  }

  getAll = async (req: Request, res: Response) => {
    const tests = await this.getTestHandler.execute(new GetTestsQuery());

    res.json(tests);
  };

  create = async (req: Request, res: Response) => {
    const { name } = req.body;

    const test = await this.createTestHandler.execute(
      new CreateTestCommand(name),
    );

    res.json(test);
  };
}
