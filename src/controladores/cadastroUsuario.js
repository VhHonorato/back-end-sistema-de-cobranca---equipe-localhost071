const knex = require('../conexao');
const bcrypt = require('bcrypt');
const {cadastroSchema, atualizarCadastroSchema} = require('../validacoes/cadastroSchema');


const cadastrarUsuario = async (req, res) => {
    const {nome, email, senha} = req.body;

    try {
        await cadastroSchema.validate(req.body);

        const seExisteUsuario = await knex('usuarios').where({email}).first();
     
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

const exibirCadastro = async (req, res) => {
    return res.status(200).json(req.usuario);
}

const atualizarCadastro = async (req, res) => {
    let {
        nome,
        email,
        senha,
        cpf,
        telefone
    } = req.body;

    const {id} = req.usuario;
    
    try {
        await atualizarCadastroSchema.validate(req.body);
        
        const emailJaCadastrado = await knex('usuarios').where({email}).first();
        
        if(emailJaCadastrado && emailJaCadastrado.id !== id) {
            return res.status(400).json('Email ja foi cadastrado anteriormente.')
        }
        const atualizandoCadastro = { 
            nome,
            email,
            cpf: cpf || req.usuario.cpf,
            telefone: telefone || req.usuario.telefone }
            if(senha){
                const senhaCriptografada = await bcrypt.hash(senha,10);
                atualizandoCadastro.senha = senhaCriptografada
            }
        const cadastroAtualizado = await knex('usuarios').where({id}).update(atualizandoCadastro);
        
        if(!cadastroAtualizado) {
            return res.status(400).json('Não foi possível atualizar o cadastro')
        }

        return res.status(200).json('Cadastro atualizado com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = {
    cadastrarUsuario,
    exibirCadastro,
    atualizarCadastro
}