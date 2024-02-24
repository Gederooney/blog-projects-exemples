import { Injectable } from '@nestjs/common';
import {
  IBible,
  IGetChatptersDTO,
  TVersion,
  TOldTestamentBooksNameAbbr,
  TNewTestamentBooksNameAbbr,
  IChapSibling,
  IChapterDTO,
} from './dto/get_chapters.dto';

import BDS from '@data/BDS.json';
import DRB from '@data/DRB.json';
import LSG from '@data/LSG.json';
import BFC from '@data/LSG.json';
import MAB from '@data/MAB.json';

import bibleBooksInfos from '@data/bible_books.json';

interface IBookInfos {
  Nom: string;
  abbr: TOldTestamentBooksNameAbbr | TNewTestamentBooksNameAbbr;
  testament: number;
  index: number;
  chaptersCount: number;
}

@Injectable()
export class ReadService {
  bibleBooksNamesAbbr: [
    TOldTestamentBooksNameAbbr | TNewTestamentBooksNameAbbr,
  ];
  constructor() {
    this.bibleBooksNamesAbbr = Object.keys(bibleBooksInfos) as [
      TOldTestamentBooksNameAbbr | TNewTestamentBooksNameAbbr,
    ];
  }
  /**
   * @name getBibleVersion
   * @description: Takes a version and returns in json format the bible content
   * @param version: TVersion
   * @returns bible: IBible
   */
  private getBibleVersion(version: TVersion): IBible {
    switch (version) {
      case 'DRB':
        return DRB as IBible;
      case 'BDS':
        return BDS as IBible;
      case 'BFC':
        return BFC as IBible;
      case 'MAB':
        return MAB as IBible;
      default:
        return LSG as IBible;
    }
  }

  private getBookInfos(
    book: TOldTestamentBooksNameAbbr | TNewTestamentBooksNameAbbr,
  ): IBookInfos {
    const bookInfos = (
      bibleBooksInfos as {
        [key: string]: IBookInfos;
      }
    )[book.toLocaleLowerCase()];

    return bookInfos;
  }

  getChapter(query: IGetChatptersDTO, version: TVersion): IChapterDTO {
    const bible: IBible = this.getBibleVersion(version);
    const bookInfo: IBookInfos = this.getBookInfos(query.book);

    if (!bookInfo) return {} as IChapterDTO;

    const book = bible.Testaments[bookInfo.testament].Books[bookInfo.index];

    const chapter =
      query.chapter <= 1
        ? 1
        : book.Chapters.length < query.chapter
          ? book.Chapters.length
          : +query.chapter;

    const next: IChapSibling = this.getNextChapter(bookInfo, chapter);
    const prev: IChapSibling = this.getPrevChapter(bookInfo, chapter);

    return {
      ...book.Chapters[chapter - 1],
      ID: book.Chapters[chapter - 1].ID + 1,
      next,
      prev,
    };
  }

  private getNextChapter(bookInfos: IBookInfos, chapter: number) {
    const { abbr, testament, index, chaptersCount } = bookInfos;

    if (chapter === chaptersCount) {
      const indexOfBookName = this.bibleBooksNamesAbbr.indexOf(abbr);
      if (indexOfBookName === this.bibleBooksNamesAbbr.length - 1)
        return undefined;

      if (indexOfBookName !== -1) {
        const newBookIndex = testament === 0 ? index + 1 : index + 40;
        const newBookInfos =
          bibleBooksInfos[this.bibleBooksNamesAbbr[newBookIndex]];
        return {
          ID: 1,
          book: newBookInfos.abbr,
        };
      }
      return undefined;
    }

    return {
      ID: chapter + 1,
      book: abbr,
    };
  }

  private getPrevChapter(bookInfos: IBookInfos, chapter: number) {
    const { abbr, testament, index } = bookInfos;
    if (chapter === 1) {
      const indexOfBookName = this.bibleBooksNamesAbbr.indexOf(abbr);
      if (indexOfBookName === 0) return undefined;

      if (indexOfBookName !== -1) {
        const bookIndex = testament === 0 ? index - 1 : index + 38;
        const bookInfos = bibleBooksInfos[this.bibleBooksNamesAbbr[bookIndex]];
        return {
          ID: bookInfos.chaptersCount,
          book: bookInfos.abbr,
        };
      }
      return undefined;
    }

    return {
      ID: chapter - 1,
      book: abbr,
    };
  }
}
