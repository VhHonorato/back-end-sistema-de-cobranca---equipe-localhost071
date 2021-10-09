const knex = require('../conexao');
const {cadastroCobrancaSchema} = require('../validacoes/cadastroSchema');


const cadastrarCobranca = async (req, res) => {
    const {
      descricao,
      status,
      valor,
      vencimento,
    } = req.body;
    const {id} = req.params;
    try {
        await cadastroCobrancaSchema.validate(req.body);

        const selecionarCliente = await knex('clientes').where({id}).first();
     
        if(!selecionarCliente){
            return res.status(404).json('Não foi possível selecionar o cliente para realizar o cadastro da cobrança. Verifique as credênciais do cliente');
        }
        const cadastrandoCobranca = {
            cliente_id: selecionarCliente.id,
            descricao,
            status,
            valor,
            vencimento  
        };
        const queryInserirCobranca = await knex('cobrancas').insert(cadastrandoCobranca);

        if(!queryInserirCobranca){
            return res.status(400).json('Desculpe, não foi possível cadastrar a cobrança.')
        }

        return res.status(200).json('Cobranca cadastrada com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message);
    }

}
const todosClientes = async (req, res) => {
    const {id} = req.usuario;
    try {
        console.log(id);
        const dadosDoCliente = await knex.select('clientes').where({usuario_id: id}).first();
        
        if(!dadosDoCliente){
           return res.status(400).json('Não foi possivel exibir os  cliente.');
        }

        return res.status(200).json(dadosDoCliente);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarCobranca,
    todosClientes 
}