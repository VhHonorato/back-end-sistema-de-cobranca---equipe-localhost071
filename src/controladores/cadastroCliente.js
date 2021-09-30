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

        const seExisteCliente = await knex('clientes').where({cpf}).first().debug();
     
        if(seExisteCliente){
            return res.status(400).json('O cliente informado já foi cadastrado.')
        }
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
            return res.status(400).json('Não foi possível cadastrar o usuário.')
        }

        return res.status(200).json('Cliente cadastrado com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = {
    cadastrarCliente
}