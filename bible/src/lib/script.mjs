import fs from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

import bible from '../data/LSG.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testaments = bible.Testaments.map((t, index) => {
  return { ...t, ID: index };
}).map((t) => {
  const { Books } = t;
  const formatedBooks = Books.map((b, id) => {
    const { Chapters } = b;
    const formatedChapters = Chapters.map((c, id) => {
      const { Verses } = c;
      const formatedVerses = Verses.map((v, id) => {
        return { ...v, ID: id + 1 };
      });

      return { ...c, ID: id, Verses: formatedVerses };
    });
    return { ...b, ID: id, Chapters: formatedChapters };
  });

  return { ...t, Books: formatedBooks };
});

fs.writeFileSync(
  'LSG.json',
  JSON.stringify({ ...bible, Testaments: testaments }),
);
