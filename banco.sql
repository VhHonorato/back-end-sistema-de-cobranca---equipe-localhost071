create database sistema_cobranca_localhost071

create table usuarios (
	id serial primary key,
  	nome text,
  	email text unique not null,
  	senha text,
  	cpf type char(11) unique,
  	telefone text
  	
);



create table clientes (
	id serial primary key,
  	usuario_id int not null,
  	nome text not null,
  	email text unique not null,
  	cpf char(11) unique not null,
  	telefone text not null,
  	cep text,
	logradouro text,
	complemento text,
	bairro text,
	cidade text,
	estado text,
  	foreign key (usuario_id) references usuarios (id)
);


