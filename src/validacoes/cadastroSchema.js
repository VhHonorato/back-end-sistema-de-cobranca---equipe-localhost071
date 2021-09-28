const yup = require('./yup');

const cadastroSchema = yup.object().shape({
    nomeUsuario: yup
    .string()
    .required(),
    
    email: yup
    .string()
    .email()
    .required(),

    senha: yup
    .string()
    .min(5)
    .required()
});

module.exports = cadastroSchema;