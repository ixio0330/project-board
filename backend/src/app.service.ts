import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  runService(): string {
    return 'Hello Nest.js';
  }
}
