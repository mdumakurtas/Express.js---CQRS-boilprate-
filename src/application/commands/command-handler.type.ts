import { Command } from './command.type';

export type CommandHandler<TCommand extends Command = any, TResult = any> = {
  execute(command: TCommand): Promise<TResult>;
};
