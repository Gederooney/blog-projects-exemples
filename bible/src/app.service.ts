import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h2 style="font-weight: bold;">Hello</h2>';
  }
}
