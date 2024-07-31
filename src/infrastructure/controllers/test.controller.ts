import { Request, Response } from 'express';
import { GetTestsHandler, GetTestsQuery } from '../../application/queries';
import {
  CreateTestCommand,
  CreateTestHandler,
} from '../../application/commands';
import { CreateTestDto } from '../dtos';
import { plainToInstance } from 'class-transformer';
import { validateDto } from '../../application/utils';

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
    const createTestDto = plainToInstance(CreateTestDto, req.body);
    await validateDto(createTestDto);

    const test = await this.createTestHandler.execute(
      new CreateTestCommand(createTestDto.name),
    );

    res.json(test);
  };
}
