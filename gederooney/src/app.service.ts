import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getHello() {
    const content = fs.readFileSync('index.html', 'utf-8');
    return content;
  }
}
