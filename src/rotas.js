const express = require('express');
const cadastrarUsuario = require('./controladores/cadastroUsuario');
const rotas = express();

rotas.post('/cadastro', cadastrarUsuario.cadastrarUsuario);

module.exports = rotas;