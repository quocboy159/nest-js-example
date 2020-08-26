import { LoggerService } from '@nestjs/common';

export class MyLogger implements LoggerService {
  log(message: string) {
    console.log(message);
  }
  error(message: string) {
    /* your implementation */
    console.log(`Error: ${message}`);
  }
  warn(message: string) {
    /* your implementation */
    console.log(`Warn: ${message}`);
  }
  debug(message: string) {
    /* your implementation */
    console.log(`Debug: ${message}`);
  }
  verbose(message: string) {
    /* your implementation */
    console.log(`Verbose: ${message}`);
  }
}
