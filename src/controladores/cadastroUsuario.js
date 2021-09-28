const knex = require('../conexao');
const bcrypt = require('bcrypt');
const cadastroSchema = require('../validacoes/cadastroSchema')

const casdatrarUsuario = async (req, res) => {
    const {nomeUsuario, email, senha} = req.body;

    try {
        await cadastroSchema.validate(req.body)
    } catch (error) {
        
    }

}