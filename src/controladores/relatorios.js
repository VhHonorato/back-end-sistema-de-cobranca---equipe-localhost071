const { Dayjs } = require("dayjs");
const knex = require("../conexao");


const relatorioEmDiaOuInadimplente = async (req, res) => {
const { id } = req.usuario;
const {inadimplente} = req.query;
try {
    const listarClientes = await knex
    .select("*")
    .from("clientes")
    .where({ usuario_id: id });
    const promises = listarClientes.map(async (cliente) => {
        const quantidadeCobrancasVencidas = await knex('cobrancas')
        .where({status: false, cliente_id: cliente.id})
        .where('vencimento', '<', new Date())
        .count('*').first();
        if(quantidadeCobrancasVencidas.count > 0 ){
            cliente.status = 'inadimplente'
        } else {
            cliente.status = 'em dia'
        }
        console.log(quantidadeCobrancasVencidas);
        return cliente 
    })
    let resposta = await Promise.all(promises);
    if(inadimplente){
        resposta = resposta.filter((cliente) => cliente.status == 'inadimplente')
    }else{
        resposta = resposta.filter((cliente) => cliente.status == 'em dia')
    }


    return res.status(200).json(resposta);

} catch (error) {
    return res.status(400).json(error.message);
}

}

const relatorioVencida = async (req, res) => {
    const { id } = req.usuario;

try {
    const listarClientes = await knex
    .select("*")
    .from("clientes")
    .where({ usuario_id: id });
    const promises = listarClientes.map(async (cliente) => {
        const quantidadeCobrancasVencidas = await knex .select("*")
        .from('cobrancas')
        .leftJoin('clientes', 'cobrancas.cliente_id', 'clientes.id')
        .where({status: false, cliente_id: cliente.id})
        .where('vencimento', '<', new Date())
        .groupBy(
            'nome',
            'telefone',
            'email', 
            'clientes.id', 
            'cpf',
            'id_cobranca',
            'cliente_id',
            'descricao',
            'status',
            
            );
        // console.log(quantidadeCobrancasVencidas);
        
         return quantidadeCobrancasVencidas; 
         
    })
    let resposta = await Promise.all(promises);
    const cobrancasVencidas = resposta [0];
    if(!cobrancasVencidas){
        return res.status(200).json([]);
    }
  
    return res.status(200).json(cobrancasVencidas);
      
  } catch (error) {
    return res.status(400).json(error.message);
}

}

const relatorioPrevista= async (req, res) => {
    const { id } = req.usuario;

try {
    const listarClientes = await knex
    .select("*")
    .from("clientes")
    .where({ usuario_id: id });
    const promises = listarClientes.map(async (cliente) => {
        const quantidadeCobrancasVencidas = await knex('cobrancas')
        .where({status: false, cliente_id: cliente.id})
        .where('vencimento', '>', new Date());
        console.log(quantidadeCobrancasVencidas);
       
       

        return quantidadeCobrancasVencidas; 
    })

   
    let resposta = await Promise.all(promises);
    const cobrancasPrevistas = resposta[0];
    if(!cobrancasPrevistas){
        return res.status(200).json([]);
    }
    
    return res.status(200).json(cobrancasPrevistas);

} catch (error) {
    return res.status(400).json(error.message);
}

}


const relatorioPagas = async (req, res) => {
    const { id } = req.usuario;
    
try {
    const listarClientes = await knex
    .select("*")
    .from("clientes")
    .where({ usuario_id: id });
    const promises = listarClientes.map(async (cliente) => {
        const quantidadeCobrancasPagas = await knex
        .select("*")
        .from('cobrancas')
        .leftJoin('clientes', 'cobrancas.cliente_id', 'clientes.id')
        .where({status: true, cliente_id: cliente.id})
        .groupBy(
            'nome',
            'telefone',
            'email', 
            'clientes.id', 
            'cpf',
            'id_cobranca',
            'cliente_id',
            'descricao',
            'status',
            
            );
        
      
        
        
        return quantidadeCobrancasPagas; 
       
     

       
    })
    let resposta = await Promise.all(promises);
    console.log(resposta);
    if(!resposta){
        return res.status(200).json([]);
    }  
   
    return res.status(200).json(resposta[0]);

} catch (error) {
    return res.status(400).json(error.message);
}

}

module.exports = {
    relatorioEmDiaOuInadimplente,
    relatorioVencida,
    relatorioPrevista,
    relatorioPagas
}