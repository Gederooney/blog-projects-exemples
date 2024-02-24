import express from "express";
import Color from "color";
import chroma from "chroma-js";
import { fileURLToPath } from "url";
import path from "path";
import ejs from "ejs";
import { all, iconsLength } from "material-icons-list";
import fs from "node:fs";
import comp from "complementary-colors";
import { Harmonizer } from "color-harmony";
import Pigment from "pigmentjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const harmonizer = new Harmonizer();

app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/search", (req, res, next) => {
  const { q } = req.query;
  try {
    const color = new Color(q);

    const base = Pigment.Pigment(color.hex());

    const complementaryColors = [base.complementary().hex];

    const analogousColors = base.monochrome(5).map(c => c.hex);

    const tetradicColors = harmonizer.harmonize(color.hex(), "tetradic");
    const triadic = base.triad().map(c => c.hex);

    const square = harmonizer.harmonize(color.hex(), "neutral");

    const shades = makeShadesHSL(color.hsl().array(), 30);
    const shadesHex = shades.map(hsl => Color.hsl(hsl).hex());
    const shadesChromaHex = shadesChroma(color.hex());

    return res.render("search", {
      color: color.hex(),
      shades: shadesHex,
      query: q,
      shadesChroma: shadesChromaHex,
      complementaryColors,
      analogousColors,
      triadic
    });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

function makeShadesHSL(hslArray, stepsCount) {
  const interval = 98 / stepsCount;
  const shades = [];

  for (let i = stepsCount; i > 0; i--) {
    const hsl = hslArray.slice();
    hsl[2] = interval * i;
    shades.push(hsl);
  }
  return shades;
}

function shadesChroma(color) {
  const chromaColor = chroma(color);
  const whitest = chromaColor.set("hsl.l", 0.98);
  const blackest = chromaColor.set("hsl.l", 0.05);

  const shades = chroma
    .scale([whitest, chromaColor, blackest])
    .mode('lch')
    .colors(30);
  return shades;
}

const generateComplementaryColors = color => {
  const start = color.set("hsl.s", 1);
  const end = color.set("hsl.h", (color.hsl()[0] + 180) % 360).set("hsl.s", 1);
  return chroma.scale([start, end]).mode("lab").colors(5);
};

const generateAnalogousColors = color => {
  const numberOfColors = 5; // Nombre de couleurs analogues à générer
  const interval = 15; // Interval pour créer des couleurs analogues (peut être ajusté)

  const baseHue = color.get("hsl.h"); // Teinte de la couleur de base
  const analogousColors = [];

  for (let i = 1; i <= numberOfColors; i++) {
    const newHue = (baseHue + interval * i) % 360; // Calcul de la nouvelle teinte
    const analogousColor = color.set("hsl.h", newHue).set("hsl.l", 0.75); // Création de la couleur analogue
    analogousColors.push(analogousColor.hex());
  }

  return analogousColors;
};

function generateAllCombinationsWithOrder(arr) {
  const combinations = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i !== j) {
        combinations.push([arr[i], arr[j]]);
      }
    }
  }

  return combinations;
}

function generateAllCombinations2(arr) {
  const combinations = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i !== j) {
        combinations.push([arr[i], arr[j]]);
      }
    }
  }

  return combinations;
}

const generateTetradicColors = color => {
  const numberOfColors = 4; // Nombre de couleurs tétradriques à générer

  const baseHue = color.get("hsl.h"); // Teinte de la couleur de base
  const interval = 90; // Écart pour créer des couleurs tétradriques

  const tetradicColors = [];

  for (let i = 0; i < numberOfColors; i++) {
    const newHue = (baseHue + interval * i) % 360; // Calcul de la nouvelle teinte
    const tetradicColor = color.set("hsl.h", newHue); // Création de la couleur tétradrique
    tetradicColors.push(tetradicColor.hex());
  }

  const last = chroma(tetradicColors[2]).set("hsl.l", 0.75).hex();
  tetradicColors.push(last);
  return tetradicColors;
};
