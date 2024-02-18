import fs from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

import bible from '../data/LSG.json' assert { type: 'json' };

const oldTestamentBookNames = [
  { Nom: 'Genèse', abbr: 'Gen' },
  { Nom: 'Exode', abbr: 'Ex' },
  { Nom: 'Lévitique', abbr: 'Lev' },
  { Nom: 'Nombres', abbr: 'Nom' },
  { Nom: 'Deutéronome', abbr: 'Deut' },
  { Nom: 'Josué', abbr: 'Jos' },
  { Nom: 'Juges', abbr: 'Jug' },
  { Nom: 'Ruth', abbr: 'Ruth' },
  { Nom: '1 Samuel', abbr: '1 Sam' },
  { Nom: '2 Samuel', abbr: '2 Sam' },
  { Nom: '1 Rois', abbr: '1 Ro' },
  { Nom: '2 Rois', abbr: '2 Ro' },
  { Nom: '1 Chroniques', abbr: '1 Chr' },
  { Nom: '2 Chroniques', abbr: '2 Chr' },
  { Nom: 'Esdras', abbr: 'Esd' },
  { Nom: 'Néhémie', abbr: 'Neh' },
  { Nom: 'Esther', abbr: 'Est' },
  { Nom: 'Job', abbr: 'Job' },
  { Nom: 'Psaumes', abbr: 'Ps' },
  { Nom: 'Proverbes', abbr: 'Prov' },
  { Nom: 'Ecclésiaste', abbr: 'Eccl' },
  { Nom: 'Cantique des Cantiques', abbr: 'Cant' },
  { Nom: 'Ésaïe', abbr: 'Es' },
  { Nom: 'Jérémie', abbr: 'Jer' },
  { Nom: 'Lamentations', abbr: 'Lam' },
  { Nom: 'Ézéchiel', abbr: 'Ez' },
  { Nom: 'Daniel', abbr: 'Dan' },
  { Nom: 'Osée', abbr: 'Os' },
  { Nom: 'Joël', abbr: 'Joel' },
  { Nom: 'Amos', abbr: 'Am' },
  { Nom: 'Abdias', abbr: 'Abd' },
  { Nom: 'Jonas', abbr: 'Jon' },
  { Nom: 'Michée', abbr: 'Mich' },
  { Nom: 'Nahum', abbr: 'Nah' },
  { Nom: 'Habacuc', abbr: 'Hab' },
  { Nom: 'Sophonie', abbr: 'Soph' },
  { Nom: 'Aggée', abbr: 'Agg' },
  { Nom: 'Zacharie', abbr: 'Zach' },
  { Nom: 'Malachie', abbr: 'Mal' },
];

const newTestamentBookNames = [
  { Nom: 'Matthieu', abbr: 'Mt' },
  { Nom: 'Marc', abbr: 'Mc' },
  { Nom: 'Luc', abbr: 'Lc' },
  { Nom: 'Jean', abbr: 'Jn' },
  { Nom: 'Actes des Apôtres', abbr: 'Ac' },
  { Nom: 'Romains', abbr: 'Rm' },
  { Nom: '1 Corinthiens', abbr: '1 Co' },
  { Nom: '2 Corinthiens', abbr: '2 Co' },
  { Nom: 'Galates', abbr: 'Ga' },
  { Nom: 'Éphésiens', abbr: 'Ep' },
  { Nom: 'Philippiens', abbr: 'Ph' },
  { Nom: 'Colossiens', abbr: 'Col' },
  { Nom: '1 Thessaloniciens', abbr: '1 Th' },
  { Nom: '2 Thessaloniciens', abbr: '2 Th' },
  { Nom: '1 Timothée', abbr: '1 Tm' },
  { Nom: '2 Timothée', abbr: '2 Tm' },
  { Nom: 'Tite', abbr: 'Tt' },
  { Nom: 'Philémon', abbr: 'Phm' },
  { Nom: 'Hébreux', abbr: 'He' },
  { Nom: 'Jacques', abbr: 'Jc' },
  { Nom: '1 Pierre', abbr: '1 P' },
  { Nom: '2 Pierre', abbr: '2 P' },
  { Nom: '1 Jean', abbr: '1 Jn' },
  { Nom: '2 Jean', abbr: '2 Jn' },
  { Nom: '3 Jean', abbr: '3 Jn' },
  { Nom: 'Jude', abbr: 'Jude' },
  { Nom: 'Apocalypse', abbr: 'Ap' },
];
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const [oldTestament, newTestament] = bible.Testaments;

const formatedOldTestament = {
  ...oldTestament,
  Books: oldTestament.Books.map((b, index) => {
    return {
      ...b,
      abbr: oldTestamentBookNames[index].abbr.replaceAll(' ', '.'),
    };
  }),
};

const formatedNewTestament = {
  ...newTestament,
  Books: newTestament.Books.map((b, index) => {
    return {
      ...b,
      abbr: newTestamentBookNames[index].abbr.replaceAll(' ', '.'),
    };
  }),
};

const formatedBible = {
  ...bible,
  Testaments: [formatedOldTestament, formatedNewTestament],
};

fs.writeFileSync(
  join(__dirname, '../data/LSG.json'),
  JSON.stringify(formatedBible),
);
