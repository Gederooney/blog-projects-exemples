import icons from "./svgs.json" assert { type: "json" };
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const svgs = icons.map(icon => {
  const svg = icon.svg
    .replace('height="24"', "")
    .replace('width="24"', 'class="text-current fill-current h-full w-full"');
  return { ...icon, svg };
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.writeFileSync(path.join(__dirname, "svgs.json"), JSON.stringify(svgs));
