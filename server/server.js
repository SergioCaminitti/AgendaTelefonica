const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
 
const app = express();
app.use(cors());
app.use(bodyParser.json());
 
app.post("/log", (req, res) => {
  const { message } = req.body;
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - ${message}\n`;

  fs.appendFile(path.join(__dirname, "deletion-log.txt"), logEntry, (err) => {
    if (err) {
      console.error("Erro ao gravar o log:", err);
      return res.status(500).send("Erro ao gravar o log");
    }
    res.status(200).send("Log gravado com sucesso");
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor de log rodando na porta ${PORT}`);
});
