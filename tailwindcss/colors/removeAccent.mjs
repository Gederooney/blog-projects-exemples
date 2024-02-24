import colors from "./colors.json" assert { type: "json" };
import fs from "fs";

function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const colorWithnameWithoutAccent = colors.map(c => ({
  ...c,
  name_withoutAccent: removeAccents(c.name_fr)
}));

fs.writeFileSync("colors.json", JSON.stringify(colorWithnameWithoutAccent));
