const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');
const {loginSchema} = require('../validacoes/cadastroSchema');

const loginUsuario = async (req, res) => {
    const {email, senha} = req.body;

    try {
        await loginSchema.validate(req.body);

        const cadastroUsuario = await knex('usuarios').where({email}).first().debug();
        if(!cadastroUsuario){
            return res.status(404).json('O cadastro do usuário não foi encontrado.');
        }

        const senhaCorreta = await bcrypt.compare(senha, cadastroUsuario.senha);
        if(!senhaCorreta){
            return res.status(400).json('Email e/ou senha inválidos.')
        }
        
        const dadosTokenUsuario = {
            id: cadastroUsuario.id,
            email: cadastroUsuario.email
        }

        const token = jwt.sign(dadosTokenUsuario, senhaHash, {expiresIn: '8h'});

        const {senha: _, ...dadosUsuario} = cadastroUsuario;

        return res.status(200).json({
            usuario: dadosUsuario.email,
            token
        })

    } catch (error) {
        return res.status(400).json(error.message);
    }
}
module.exports = {loginUsuario}