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

const cadastroClienteSchema = yup.object().shape({
    nome: yup
    .string()
    .required(),
    
    email: yup
    .string()
    .email()
    .required(),

    telefone: yup
    .string()
    .required(),

    cpf: yup
    .string()
    .min(11)
    .required(),

    telefone: yup
    .string()
    .required(),

    cep: yup
    .string(),

	logradouro: yup
    .string(),

	complemento: yup
    .string(),

	bairro: yup
    .string(),

	cidade: yup
    .string(),

	estado: yup
    .string()
});

module.exports = {cadastroSchema, loginSchema, atualizarCadastroSchema, cadastroClienteSchema};