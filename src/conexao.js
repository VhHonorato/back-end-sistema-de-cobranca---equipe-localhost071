// const knex = require('knex')({
//     client: 'pg',
//     connection: {
//         host: 'localhost',
//         user: 'postgres',
//         password: 'jsm1183',
//         database: 'sistema_cobranca_localhost071'
//     }
// });

const knex = require('knex')({
    client: 'pg',
    connection: {
        host : 'ec2-107-22-18-26.compute-1.amazonaws.com',
        port : 5432,
        user : 'rcthgtcijgsglm',
        password : '814e04ce09bbccb47135938c3499047924af77928173e2fc500322c03e032723',
        database : 'devek15gco18hq',
        ssl: {
            rejectUnauthorized : false
        }
    }
});

module.exports = knex;