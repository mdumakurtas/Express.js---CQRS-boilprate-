import { Query } from './query.type';

export type QueryHandler<T extends Query = any, TResult = any> = {
  execute(query: T): Promise<TResult>;
};
