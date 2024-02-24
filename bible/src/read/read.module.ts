import { Module } from '@nestjs/common';
import { ReadService } from './read.service';
import { ReadController } from './read.controller';

@Module({
  providers: [ReadService],
  controllers: [ReadController],
})
export class ReadModule {}
