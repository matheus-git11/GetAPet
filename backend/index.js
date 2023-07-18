const express = require("express");
const cors = require("cors");

const app = express();

//configurando Resposta em Json
app.use(express.json());

// resolvendo problema de cors , liberando ele a acessar nossa api
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//pasta public fica responsavel por arquivos estaticos e imagens
app.use(express.static('public'))

//Routes

app.listen(5000)