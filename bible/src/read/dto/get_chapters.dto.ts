export interface IGetChatptersDTO {
  book: TOldTestamentBooksNameAbbr | TNewTestamentBooksNameAbbr;
  chapter: number;
  verses?: IVerse[];
}

export type TVersion = 'BDS' | 'LSG' | 'BFC' | 'DRB' | 'MAB';

export interface IVerse {
  ID: number;
  Text: string;
}

export interface IChapter {
  ID: number;
  Verses: IVerse[];
}

export interface IChapterDTO {
  ID: number;
  Verses: IVerse[];
  next: IChapSibling | undefined;
  prev: IChapSibling | undefined;
}

export interface IChapSibling {
  ID: number; // first index is 1
  book: TOldTestamentBooksNameAbbr | TNewTestamentBooksNameAbbr;
}

export type TOldTestamentBooksNameAbbr =
  | 'Gen'
  | 'Ex'
  | 'Lev'
  | 'Nom'
  | 'Deut'
  | 'Jos'
  | 'Jug'
  | 'Ruth'
  | '1.Sam'
  | '2.Sam'
  | '1.Ro'
  | '2.Ro'
  | '1.Chr'
  | '2.Chr'
  | 'Esd'
  | 'Neh'
  | 'Est'
  | 'Job'
  | 'Ps'
  | 'Prov'
  | 'Eccl'
  | 'Cant'
  | 'Es'
  | 'Jer'
  | 'Lam'
  | 'Ez'
  | 'Dan'
  | 'Os'
  | 'Joel'
  | 'Am'
  | 'Abd'
  | 'Jon'
  | 'Mich'
  | 'Nah'
  | 'Hab'
  | 'Soph'
  | 'Agg'
  | 'Zach'
  | 'Mal';

export type TNewTestamentBooksNameAbbr =
  | 'Mt'
  | 'Mc'
  | 'Lc'
  | 'Jn'
  | 'Ac'
  | 'Rm'
  | '1.Co'
  | '2.Co'
  | 'Ga'
  | 'Ep'
  | 'Ph'
  | 'Col'
  | '1.Th'
  | '2.Th'
  | '1.Tm'
  | '2.Tm'
  | 'Tt'
  | 'Phm'
  | 'He'
  | 'Jc'
  | '1.P'
  | '2.P'
  | '1.Jn'
  | '2.Jn'
  | '3.Jn'
  | 'Jude'
  | 'Ap';

export interface IBook {
  Chapters: IChapter[];
  Text: string;
  ID: number;
  abbr: TOldTestamentBooksNameAbbr | TNewTestamentBooksNameAbbr;
}

export interface ITestament {
  ID: number;
  Books: IBook[];
  Text: string;
}

export interface IBible {
  Testaments: ITestament[];
  Text: string;
}
