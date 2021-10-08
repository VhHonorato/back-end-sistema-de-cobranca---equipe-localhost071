const knex = require('../conexao');
const {cadastroCobrancaSchema} = require('../validacoes/cadastroSchema');

const listaClientes = async (req, res) => {
    const {id} = req.usuario;
    try {
        const listarNomeClientes = await knex('clientes').where({usuario_id: id});
        if(!listarNomeClientes){
            return res.status(400).json('Desculpe, não foi possível exibir os clientes. Favor verificar as credênciais do usuário.')
        }

        res.status(200).json(listarNomeClientes);
    } catch (error) {
        return res.status(400).json(error.message);
    }
   

}

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
const detalharCliente = async (req, res) => {
    const {id} = req.params;
    try {
        const detalhesDoCliente = await knex.select('*').from('cobrancas')
        .fullOuterJoin('clientes', 'clientes.id', 'cobrancas.cliente_id')
        .where({id});

        if(!detalhesDoCliente){
           return res.status(400).json('Não foi possivel detalhar os dados do cliente.');
        }

        return res.status(200).json(detalhesDoCliente);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarCobranca,
    listaClientes,
    detalharCliente
}