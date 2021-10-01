const express = require('express');
const rotas = require('./rotas');
const app = express();

app.use(express.json());
app.use(rotas);


app.listen(proccess.env.PORT || 3000);