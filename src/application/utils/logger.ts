import { Query } from '../queries';
import { Command } from '../commands';

const currentLogLevel = process.env.LOG_LEVEL;

enum LogLevel {
  INFO = 'info',
  ERROR = 'error',
}

const log = (level: LogLevel, message: string, object?: unknown) => {
  const timestamp = new Date().toISOString();
  switch (level) {
    case LogLevel.INFO:
      console.log(`[${timestamp}] [${level}] ${message}`.trim(), object ?? '');
      break;
    case LogLevel.ERROR:
      console.error(
        `[${timestamp}] [${level}] ${message}`.trim(),
        object ?? '',
      );
      break;
  }
};

export const logInfo = (message: string, object?: unknown) => {
  if (currentLogLevel === LogLevel.INFO) {
    log(LogLevel.INFO, message, object);
  }
};

export const logError = (message: string, object?: unknown) => {
  if (currentLogLevel === LogLevel.ERROR || currentLogLevel === LogLevel.INFO) {
    log(LogLevel.ERROR, message, object);
  }
};

export const logQueryHandler = (query: Query) => {
  logInfo('Query executed', query);
};

export const logCommandHandler = (command: Command) => {
  logInfo('Command executed', command);
};
