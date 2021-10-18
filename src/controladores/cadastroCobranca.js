const knex = require("../conexao");
const { cadastroCobrancaSchema, editarCobrancaSchema } = require("../validacoes/cadastroSchema");
const { isAfter, isBefore, parseISO, isToday, isTomorrow } = require("date-fns");
const {utcToZonedTime, zonedTimeToUtc} = require("date-fns-tz");
const {verificarDatas} = require("../filtros/util");
const dayjs = require("dayjs"); 

const cadastrarCobranca = async (req, res) => {
  const { descricao, status, valor, vencimento } = req.body;
  const { id } = req.params;
  const {id: id_usuario} = req.usuario;
  try {
    await cadastroCobrancaSchema.validate(req.body);

    const selecionarCliente = await knex("clientes").where({ id }).first();
    console.log(id);
    if (!selecionarCliente) {
      return res
        .status(400)
        .json(
          "Não foi possível selecionar o cliente para realizar o cadastro da cobrança. Verifique as credênciais do cliente"
        );
    }
    const valorAjustado = valor * 100; 
    const cadastrandoCobranca = {
      cliente_id: selecionarCliente.id,
      descricao,
      status,
      valor: valorAjustado,
      vencimento,
    };
 
    if(selecionarCliente.usuario_id !== id_usuario) {
      return res.status(400).json('O usario não tem permissão para cadastrar uma cobrança nesse cliente.')
    };

    if(dayjs().diff(vencimento, 'day') > 0){
      return res.status(400).json("Desculpe, não é possível deletar uma data de vencimento anterior a data atual.")
    }
  

    const queryInserirCobranca = await knex("cobrancas").insert(
      cadastrandoCobranca
    );

    if (!queryInserirCobranca) {
      return res
        .status(400)
        .json("Desculpe, não foi possível cadastrar a cobrança.");
    }
    
    return res.status(200).json("Cobranca cadastrada com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const listarCobranca = async (req, res) => {
  const { id } = req.usuario;


  try {
    const listaDeCobrancas = await knex
      .select("*")
      .from("clientes")
      .fullOuterJoin("cobrancas", "cobrancas.cliente_id", "clientes.id")
      .where({ usuario_id: id });

    if (!listaDeCobrancas) {
      return res
        .status(400)
        .json("Não foi possivel listar as cobranças dos clientes");
    }
 
    let cobrancaFiltradas = listaDeCobrancas.filter(({id_cobranca}) => id_cobranca);
   
    
   
    return res.status(200).json(cobrancaFiltradas);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const editarCobranca = async (req, res) => {
  let {
    cliente_id,
    descricao,
    status,
    vencimento,
    valor
  } = req.body;
  const {id_cobranca} = req.params;
  const {id: id_usuario} = req.usuario;
  
  try {
      await editarCobrancaSchema.validate(req.body);
      
    
      const verificarClienteId = await knex('cobrancas').where({id_cobranca}).first();
  
      const clienteId = verificarClienteId.cliente_id;
   
     
      const verificarUsuarioLogado = await knex('clientes').where({id:clienteId}).first();
      console.log(verificarUsuarioLogado.usuario_id);
      console.log(id_usuario);
      if(verificarUsuarioLogado.usuario_id != id_usuario){
          return res.status(400).json('Usuario não tem permissão para editar essa cobrança.');
      }   
      
      const valorAjustado = valor * 100; 
      const editandoCobranca = { 
        cliente_id,
        descricao,
        status,
        vencimento,
        valor: valorAjustado
      }

    
      const combrancaEditada = await knex('cobrancas').where({id_cobranca}).update(editandoCobranca);
      

      if(!combrancaEditada) {
          return res.status(400).json('Não foi possível editar a cobrança.')
      }

      return res.status(200).json('Cobrança atualizada com sucesso.')
  } catch (error) {
      return res.status(400).json(error.message);
  }

}

const excluirCobranca = async (req, res) => {
  const {id_cobranca} = req.params;
  const {id: id_usuario} = req.usuario;

  try {
    const cobranca = await knex('cobrancas').where({id_cobranca}).first();
    
    if(!cobranca){
      return res.status(400).json('Cobrança não encontrada')
    }

    const clienteId = cobranca.cliente_id;
    const verificarUsuarioLogado = await knex('clientes').where({id:clienteId}).first();
      
      if(verificarUsuarioLogado.usuario_id != id_usuario){
          return res.status(400).json('Usuario não tem permissão para excluir essa cobrança.');
      }   
  
    
      if(cobranca.status === true){
        return res.status(400).json('Não é possível excluir cobranças com status pago')
      }



      if(dayjs().diff(cobranca.vencimento, 'day') > 0){
        return res.status(400).json("Desculpe, não é possível cadastrar uma data de vencimento anterior a data atual.")
      }

      const excluindoCobranca = await knex('cobrancas').del().where({id_cobranca});

      if(!excluindoCobranca){
        return res.status(400).json('Não é possível excluir a cobrança')
      }
      return res.status(200).json('Cobrança excluída com sucesso.');

  } catch (error) {
    return res.status(400).json(error.message);
  }
    
}

module.exports = {
  cadastrarCobranca,
  listarCobranca,
  editarCobranca,
  excluirCobranca
};
