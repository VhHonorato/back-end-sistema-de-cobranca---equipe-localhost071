const knex = require('../conexao');
const bcrypt = require('bcrypt');
const {cadastroSchema} = require('../validacoes/cadastroSchema');


const cadastrarUsuario = async (req, res) => {
    const {nome, email, senha} = req.body;

    try {
        await cadastroSchema.validate(req.body);

        const seExisteUsuario = await knex('usuarios').where({email}).first().debug();
        // await usuarioSchema.validate(seExisteUsuario)
//Como usar o yup para validar seExisteUsuario?
        if(seExisteUsuario){
            return res.status(400).json('O email informado já foi cadastrado.')
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const queryInserirUsuario = await knex('usuarios').insert({
            nome,
            email,
            senha: senhaCriptografada
        });

        if(!queryInserirUsuario){
            return res.status(400).json('Não foi possível cadastrar o usuário.')
        }

        return res.status(200).json('Usuário cadastrado com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message);
    }

}
module.exports = {
    cadastrarUsuario
}