import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { IGetChatptersDTO, TVersion } from './dto/get_chapters.dto';
import { ReadService } from './read.service';

@Controller('read')
export class ReadController {
  constructor(private readonly readService: ReadService) {}

  @Get(':version/')
  async getBook(
    @Param('version') version: string = 'LSG',
    @Query() query: IGetChatptersDTO,
  ) {
    const parsedVersion = this.isTVersion(version.toUpperCase());
    if (!parsedVersion) {
      throw new HttpException('Bad Bible version', HttpStatus.BAD_REQUEST);
    }

    return this.readService.getChapter(
      query,
      version.toUpperCase() as TVersion,
    );
  }

  private isTVersion(version: string): TVersion | null {
    return ['BDS', 'LSG', 'BFC', 'DRB', 'MAB'].includes(version)
      ? (version as TVersion)
      : null;
  }
}
