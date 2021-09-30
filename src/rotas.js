const express = require('express');
const cadastrarUsuario = require('./controladores/cadastroUsuario');
const loginUsuario = require('./controladores/loginUsuario');
const cadastrarCliente = require('./controladores/cadastroCliente');
const verificaLogin = require('./filtros/verificaLogin')
const rotas = express();

rotas.post('/cadastro', cadastrarUsuario.cadastrarUsuario);

rotas.post('/login', loginUsuario.loginUsuario);

rotas.use(verificaLogin);

rotas.get('/cadastro', cadastrarUsuario.exibirCadastro);
rotas.put('/cadastro', cadastrarUsuario.atualizarCadastro);
rotas.get('/usuario/cadastro', cadastrarCliente.cadastrarCliente);
module.exports = rotas;