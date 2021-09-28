const express = require('express');
const cadastrarUsuario = require('./controladores/cadastroUsuario');
const verificaLogin = require('./filtros/verificaLogin')
const rotas = express();

rotas.post('/cadastro', cadastrarUsuario.cadastrarUsuario);

rotas.get('/cadastro', cadastrarUsuario.exibirCadastro);

module.exports = rotas;