import { Injectable } from '@nestjs/common';
import { Response } from './response.entity';

@Injectable()
export class ResponseService {
  sendResponse({ message, data }) {
    const response = new Response();
    response.message = message;
    response.data = data instanceof Array ? data : [data];
    return response;
  }
}
