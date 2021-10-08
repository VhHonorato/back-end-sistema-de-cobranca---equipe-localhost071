const express = require("express");
const cadastrarUsuario = require("./controladores/cadastroUsuario");
const loginUsuario = require("./controladores/loginUsuario");
const cadastrarCliente = require("./controladores/cadastroCliente");
const verificaLogin = require("./filtros/verificaLogin");
const rotas = express();

rotas.post("/cadastro", cadastrarUsuario.cadastrarUsuario);
rotas.post("/login", loginUsuario.loginUsuario);

rotas.use(verificaLogin);

rotas.get("/cadastro", cadastrarUsuario.exibirCadastro);
rotas.put("/cadastro", cadastrarUsuario.atualizarCadastro);

rotas.post("/cliente/cadastro", cadastrarCliente.cadastrarCliente);
rotas.put("/cliente/cadastro/:id", cadastrarCliente.atualizarCadastroCliente);
rotas.get("/cliente/:id", cadastrarCliente.exibirCadastroCliente)

module.exports = rotas;
