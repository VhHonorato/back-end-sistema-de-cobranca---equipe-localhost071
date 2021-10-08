const knex = require('../conexao');
const {cadastroClienteSchema, atualizarCadastroClienteSchema} = require('../validacoes/cadastroSchema');


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

        const seExisteCliente = await knex('clientes').where({email}).first();
     
        if(seExisteCliente){
            return res.status(400).json('O cliente informado já foi cadastrado.')
        };

        const seExisteCpf = await knex('clientes').where({cpf}).first();
     
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
    const {id} = req.params;
  
    
    try {
        await atualizarCadastroClienteSchema.validate(req.body);

        
        const emailJaCadastrado = await knex('clientes').where({email}).first();
        
        if(emailJaCadastrado && emailJaCadastrado.id !== Number(id)) {
            return res.status(400).json('Email ja foi cadastrado anteriormente.')
        }

        const seExisteCpf = await knex('clientes').where({cpf}).first();
        
        if(seExisteCpf && seExisteCpf.id !== Number(id)) {
            return res.status(400).json('CPF ja foi cadastrado anteriormente.')
        }
        const atualizandoCadastroClientes = { 
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
        }

      
        const cadastroClienteAtualizado = await knex('clientes').where({id}).update(atualizandoCadastroClientes);
        

        if(!cadastroClienteAtualizado) {
            return res.status(400).json('Não foi possível atualizar o cadastro')
        }

        return res.status(200).json('Cadastro atualizado com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message);
    }

}

const exibirCadastroCliente = async (req, res) => {
    const {id} = req.usuario;
    const dadosCliente = await knex('clientes').where({usuario_id: id}).first()
    const exibirDadosCliente = {
        nome: dadosCliente.nome,
        email: dadosCliente.email,
        telefone: dadosCliente.telefone,
    };
    return res.status(200).json(exibirDadosCliente);

}

module.exports = {
    cadastrarCliente,
    atualizarCadastroCliente,
    exibirCadastroCliente

}