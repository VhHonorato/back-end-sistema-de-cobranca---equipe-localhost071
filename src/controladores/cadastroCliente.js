const knex = require('../conexao');
const {cadastroClienteSchema} = require('../validacoes/cadastroSchema');


const cadastrarCliente = async (req, res) => {
    const {
        nome, 
        email,
        cpf,
        telefone,
        cep,
        logradouro, 
        complemento, 
        bairro, 
        cidade, 
        estado
    } = req.body;
    const {id} = req.usuario;
    try {
        await cadastroClienteSchema.validate(req.body);

        const seExisteCliente = await knex('clientes').where({email}).first().debug();
     
        if(seExisteCliente){
            return res.status(400).json('O cliente informado já foi cadastrado.')
        };

        const seExisteCpf = await knex('clientes').where({cpf}).first().debug();
     
        if(seExisteCpf){
            return res.status(400).json('O CPF informado já foi cadastrado.')
        };

        const cadastrandoCliente = {
            nome,
            email,
            cpf,
            telefone,
            cep,
            logradouro, 
            complemento, 
            bairro, 
            cidade, 
            estado,
            usuario_id: id  
        }
        const queryInserirCliente = await knex('clientes').insert(cadastrandoCliente);

        if(!queryInserirCliente){
            return res.status(400).json('Desculpe, não foi possível cadastrar o usuário.')
        }

        return res.status(200).json('Cliente cadastrado com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message);
    }

}

const atualizarCadastroCliente = async (req, res) => {
    let {
        nome, 
        email,
        cpf,
        telefone,
        cep,
        logradouro, 
        complemento, 
        bairro, 
        cidade, 
        estado
    } = req.body;

    const {id} = req.usuario;
    
    try {
        await atualizarCadastroSchema.validate(req.body);
        
        const emailJaCadastrado = await knex('clientes').where({email}).first().debug();
        
        if(emailJaCadastrado && emailJaCadastrado.id !== id) {
            return res.status(400).json('Email ja foi cadastrado anteriormente.')
        }

        const seExisteCpf = await knex('clientes').where({cpf}).first().debug();

        if(seExisteCpf && seExisteCpf.id !== id) {
            return res.status(400).json('CPF ja foi cadastrado anteriormente.')
        }
        const atualizandoCadastroClientes = { 
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
    cadastrarCliente
}