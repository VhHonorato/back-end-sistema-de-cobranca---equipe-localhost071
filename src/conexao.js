const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'jsm1183',
        database: 'sistema_cobranca_localhost071'
    }
});

module.exports = knex;