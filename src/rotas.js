const express = require("express");
const cadastrarUsuario = require("./controladores/cadastroUsuario");
const loginUsuario = require("./controladores/loginUsuario");
const cadastrarCliente = require("./controladores/cadastroCliente");
const cadastrarCobranca = require("./controladores/cadastroCobranca")
const verificaLogin = require("./filtros/verificaLogin");
const rotas = express();

rotas.post("/cadastro", cadastrarUsuario.cadastrarUsuario);
rotas.post("/login", loginUsuario.loginUsuario);

rotas.use(verificaLogin);

rotas.get("/cadastro", cadastrarUsuario.exibirCadastro);
rotas.put("/cadastro", cadastrarUsuario.atualizarCadastro);

rotas.post("/cliente/cadastro", cadastrarCliente.cadastrarCliente);
rotas.put("/cliente/cadastro/:id", cadastrarCliente.atualizarCadastroCliente);
rotas.get("/cliente", cadastrarCliente.listarClientes);
rotas.get("/cliente/:id", cadastrarCliente.detalharCliente)


rotas.post("/cliente/cobranca/:id", cadastrarCobranca.cadastrarCobranca);
rotas.get("/cobrancas", cadastrarCobranca.listarCobranca);
rotas.put("/cobrancas/:id_cobranca", cadastrarCobranca.editarCobranca);


module.exports = rotas;
