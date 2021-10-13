const knex = require("../conexao");
const { cadastroCobrancaSchema } = require("../validacoes/cadastroSchema");

const cadastrarCobranca = async (req, res) => {
  const { descricao, status, valor, vencimento } = req.body;
  const { id } = req.params;
  try {
    await cadastroCobrancaSchema.validate(req.body);

    const selecionarCliente = await knex("clientes").where({ id }).first();

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

  console.log(id);
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

    return res.status(200).json(listaDeCobrancas);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarCobranca,
  listarCobranca,
};
