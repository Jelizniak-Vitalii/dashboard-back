import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

@Injectable()
export class Logger implements LoggerService {
  private logger;

  constructor() {
    const colorizer = format.colorize();

    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.printf((info) => {
          const { timestamp, level, message } = info;
          const coloredMessage = colorizer.colorize(level, message); // Apply color to the log message
          return `${timestamp} [${level}]: ${coloredMessage}`;
        }),
      ),
      transports: [new transports.Console()],
    });
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  log(message: string) {
    this.logger.info(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
