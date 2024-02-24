import fs from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

import oldBookNames from '../data/old.json' assert { type: 'json' };
import newBookNames from '../data/new.json' assert { type: 'json' };
import LSG from '../data/BDS.json' assert { type: 'json' };

const [oldTestament, newTestament] = LSG.Testaments;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const keyValues = {};

oldBookNames.forEach((bookName, index) => {
  const abbr = bookName.abbr.replaceAll(' ', '.').toLowerCase();
  keyValues[abbr] = {
    ...bookName,
    testament: 0,
    abbr,
    index,
    chaptersCount: oldTestament.Books[index].Chapters.length,
  };
});

newBookNames.forEach((bookName, index) => {
  const abbr = bookName.abbr.replaceAll(' ', '.').toLowerCase();
  keyValues[abbr] = {
    ...bookName,
    testament: 1,
    abbr,
    index,
    chaptersCount: newTestament.Books[index].Chapters.length,
  };
});

fs.writeFileSync(
  join(__dirname, '../data/bible_new_books.json'),
  JSON.stringify(keyValues),
);
