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
        console.log(seExisteCpf);
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
    const {id: id_usuario} = req.usuario;
    
    try {
        await atualizarCadastroClienteSchema.validate(req.body);
        
      
        const seUsuarioLogado = await knex('clientes').where({id}).first();
        

        if(seUsuarioLogado.usuario_id != id_usuario){
            return res.status(400).json('Usuario não tem permissão para editar esse cliente.');
        }
       
        const seExisteCliente = await knex('clientes').where({id}).first();
        
        if(!seExisteCliente){
            return res.status(400).json('Não existe cliente cadastrado com essas credenciais');
        }
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

const listarClientes = async (req, res) => {
    const {id} = req.usuario;
    try {
        const listarNomeClientes = await knex('clientes')
        .select(
            'id',
            'nome',
            'email',
            'telefone',
            'cpf',
            knex.raw('sum (coalesce (cobrancas.valor, 0)) as valor_total_cobrancas_feitas'),
            knex.raw('sum (case when cobrancas.status = true then coalesce (cobrancas.valor, 0) else 0 end) as valor_total_cobrancas_recebidas')
            )
        .leftJoin('cobrancas', 'clientes.id', 'cobrancas.cliente_id')
        .where({usuario_id: id})
        .groupBy('nome', 'telefone', 'email', 'clientes.id', 'cpf');
        if(!listarNomeClientes.length){
            return res.status(400).json('')
        }

        let listaStatusCliente = listarNomeClientes.map(async (cliente) => {
            const quantidadeCobrancasVencidas = await knex('cobrancas')
            .where({status: false, cliente_id: cliente.id})
            .where('vencimento', '<', new Date())
            .count('*').first();
            if(quantidadeCobrancasVencidas.count > 0 ){
                cliente.status = 'inadimplente'
            } else {
                cliente.status = 'em dia'
            }
            return cliente 
        })

        listaStatusCliente = await Promise.all(listaStatusCliente);
        res.status(200).json(listaStatusCliente);
    } catch (error) {
        return res.status(400).json(error.message);
    }
   

}

const detalharCliente = async (req, res) => {
    const { id } = req.params;
    try {
      const seExisteId = await knex("clientes").where({ id }).first();
      console.log(seExisteId);
      if (!seExisteId) {
        return res.status(404).json("Cliente não encontrado.");
      }
  
      let detalhesDoCliente = await knex
        .select("*")
        .from("clientes")
        // .fullOuterJoin("clientes", "clientes.id", "cobrancas.cliente_id")
        .where({ id });
  
      if (!detalhesDoCliente) {
        return res
          .status(400)
          .json("Não foi possivel detalhar os dados do cliente.");
      }
      
      const detalhesCobranca = await knex("cobrancas").where({ cliente_id:id });
      if (!detalhesCobranca) {
        return res
          .status(400)
          .json("Não foi possivel detalhar os dados do cliente.");
      }
     detalhesDoCliente = {
          ...detalhesDoCliente[0],
          cobrancas: detalhesCobranca
      }
      return res.status(200).json(detalhesDoCliente);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  };
  
module.exports = {
    cadastrarCliente,
    atualizarCadastroCliente,
    listarClientes,
    detalharCliente

}