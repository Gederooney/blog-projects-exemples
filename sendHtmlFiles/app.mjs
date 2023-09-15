import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8080;

const app = express();

// Configurez Express pour servir des fichiers statiques à partir du dossier "public"
app.use(
  express.static(__dirname + "/public", {
    extensions: ["html", "css", "js"],
  }),
);

app.get("/sendfile", (req, res) =>
  res.sendFile(__dirname + "/public/fichier.html"),
);

app.get("/string", (req, res) => {
  // Lecture du contenu du fichier de manière synchrone
  const contenuDuFichier = fs.readFileSync(
    __dirname + "/public/sendfichier.html",
    "utf8",
  );

  // Renvoi du contenu en tant que réponse
  res.send(contenuDuFichier);
});

app.listen(PORT, () =>
  console.log(
    `Notre serveur est en marche à cette adresse : http://localhost:${PORT}`,
  ),
);
