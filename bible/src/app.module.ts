import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReadModule } from './read/read.module';

@Module({
  imports: [ReadModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
