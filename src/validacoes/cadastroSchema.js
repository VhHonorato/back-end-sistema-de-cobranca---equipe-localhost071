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
    .string(),
    

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

    // telefone: yup
    // .string()
    // .required(),

    // cpf: yup
    // .string()
    // .required(),

    // telefone: yup
    // .string()
    // .required(),

    // cep: yup
    // .string(),

	// logradouro: yup
    // .string(),

	// complemento: yup
    // .string(),

	// bairro: yup
    // .string(),

	// cidade: yup
    // .string(),

	// estado: yup
    // .string()
});

const atualizarCadastroClienteSchema = yup.object().shape({
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

const cadastroCobrancaSchema = yup.object().shape({
   
    descricao: yup
    .string()
    .required(),
    
    status: yup
    .string()
    .required(),

    valor: yup
    .string()
    .required(),

    descricao: yup
    .string()
    .required(),

    vencimento: yup
    .date()
    .required()
});

module.exports = {
    cadastroSchema, 
    loginSchema, 
    atualizarCadastroSchema, 
    cadastroClienteSchema, 
    atualizarCadastroClienteSchema,
    cadastroCobrancaSchema
};