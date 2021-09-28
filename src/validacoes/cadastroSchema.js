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
})

// const usuarioSchema = yup.object().when({
//     email: yup.boolean().when(false)
// })
module.exports = {cadastroSchema, loginSchema};