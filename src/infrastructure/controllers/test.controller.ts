import { Request, Response } from 'express';
import { GetTestsHandler, GetTestsQuery } from '../../application/queries';
import {
  CreateTestCommand,
  CreateTestHandler,
} from '../../application/commands';

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
