const knex = require("../conexao");


const relatorioEmDia = async (req, res) => {
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


module.exports = {
    relatorioEmDia
}