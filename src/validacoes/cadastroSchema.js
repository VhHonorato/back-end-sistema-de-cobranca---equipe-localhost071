const yup = require('./yup');

const cadastroSchema = yup.object().shape({
    nome: yup
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

const loginSchema = yup.object().shape({
    email: yup
    .string()
    .email()
    .required(),

    senha: yup
    .string()
    .required()
});

const atualizarCadastroSchema = yup.object().shape({
    nome: yup
    .string()
    .required(),
    
    email: yup
    .string()
    .email()
    .required(),

    senha: yup
    .string(),
    

    cpf: yup
    .string()
    .min(11),

    telefone: yup
    .string()
    
});

// const usuarioSchema = yup.object().when({
//     email: yup.boolean().when(false)
// })
module.exports = {cadastroSchema, loginSchema, atualizarCadastroSchema};