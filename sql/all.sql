drop database if exists KandyNess;
create database KandyNess;
use KandyNess;

create table TB_FAQs(
	cod int NOT NULL AUTO_INCREMENT,
	pergunta varchar(200) NOT NULL,
	resposta varchar(200) NOT NULL,
	primary key (cod)
);

create table TB_Categorias(
	cod int NOT NULL AUTO_INCREMENT,
	nome varchar(50),
	primary key (cod, nome)
);

create table TB_Usuarios(
	matricula char(8),
	nome varchar(150) NOT NULL,
	cpf char(11),
    senha varchar(20),
	primary key(matricula)
);

create table TBR_UserFAQs(
	quando DATETIME,
    usuario char(8),
    pergunta int,
    foreign key (usuario) references TB_Usuarios(matricula),
    foreign key (pergunta) references TB_FAQs(cod),
    primary key (usuario, quando)
);
    
create table TB_Blocos(
	cod int NOT NULL AUTO_INCREMENT,
    nome varchar(100),
    primary key (cod)
);

create table TB_Salas(
	cod int NOT NULL AUTO_INCREMENT,
    numero varchar(10),
    nome varchar(100),
    primary key (cod)
);
    
create table TB_Locais(
	cod int NOT NULL AUTO_INCREMENT,
	cod_bloco int NOT NULL,
    cod_sala int NOT NULL,
    andar int,
    primary key (cod),
    foreign key (cod_bloco) references TB_Blocos(cod),
    foreign key (cod_sala) references TB_Salas(cod)
);
        
create table TB_Chats(
	remetente char(8),
    destinatario char(8),
    data_msg DATETIME,
    mensagem char(200) NOT NULL,
    primary key (remetente, destinatario, data_msg),
    foreign key (remetente) references TB_Usuarios(matricula),
    foreign key (destinatario) references TB_Usuarios(matricula)
);

create table TB_Lojas(
	nome varchar(200),
    descricao varchar(500),
    dono char(8),
    image varchar(100),
    primary key (nome),
    foreign key (dono) references TB_Usuarios(matricula)
);

create table TB_Produtos (
	loja varchar(200),
    nome varchar(100),
    descricao varchar(500),
    image varchar(100),
    valor float,
    primary key (loja, nome),
    foreign key (loja) references TB_Lojas(nome)
);

create table TB_LojasFisicas(
	dia_da_semana varchar(8),
	lugar int NOT NULL,
    abertura time,
	loja varchar(200) NOT NULL,
    fechamento time,
    primary key (dia_da_semana, lugar, abertura, loja),
    foreign key (lugar) references TB_Locais(cod),
    foreign key (loja) references TB_Lojas(nome)
);

create table TB_Vendas(
	NF char(9),
    data_compra date,
    valor float,
    loja varchar(100) NOT NULL,
    cliente char(8) NOT NULL,
    lugar int,
    primary key (NF),
    foreign key (lugar) references TB_Locais(cod),
    foreign key (loja) references TB_Lojas(nome),
    foreign key (cliente) references TB_Usuarios(matricula)
);

create table TB_ProdutoNaVenda(
    loja varchar(100) NOT NULL,
    nome varchar(100) NOT NULL,
    venda char(9) NOT NULL,
    qtd float NOT NULL,
    primary key (loja, nome, venda),
    foreign key (loja, nome) references TB_Produtos(loja, nome),
    foreign key (venda) references TB_Vendas(NF)
);

create table TBR_CategoriaProdutos(
	cod int,
	categoria varchar(50),
	loja varchar(200),
    produto varchar(100),
    primary key (cod, categoria, loja, produto),
    foreign key (loja, produto) references TB_Produtos(loja, nome),
    foreign key (cod, categoria) references TB_Categorias(cod, nome)
);

create table TB_Denuncias(
	abertura date,
	loja varchar(200) 	NOT NULL,
    criador char(8) 	NOT NULL,
    motivo varchar(200) NOT NULL,
    primary key (abertura, loja, criador),
    foreign key (loja) references TB_Lojas(nome),
    foreign key (criador) references TB_Usuarios(matricula)
);

create table TB_Moderacaos(
	moderador char(8),
	abertura date,
	loja varchar(200),
    criador char(8),
	primary key (moderador, abertura, loja, criador),
	foreign key (abertura, loja, criador) references TB_Denuncias(abertura, loja, criador),
    foreign key (moderador) references TB_Usuarios(matricula)
);

create table TB_Avaliacaos(
	usuario char(8) NOT NULL,
	loja varchar(200),
    data_av date,
    comentario varchar(300),
    estrelas float,
    primary key (usuario, loja, data_av),
    foreign key (usuario) references TB_Usuarios(matricula),
    foreign key (loja) references TB_Lojas(nome)
);

use KandyNess;

insert into TB_FAQs (pergunta, resposta)  values (
	"posso criar uma loja sem ser aluno?", "não"
);
insert into TB_FAQs (pergunta, resposta)  values (
	"posso criar mais de uma loja?", "sim"
);
insert into TB_FAQs (pergunta, resposta)  values (
	"posso revender produtos de outras lojas?", "não"
);


insert into TB_Categorias (nome) values (
	"doce"
);
insert into TB_Categorias (nome) values (
	"azedo"
);
insert into TB_Categorias (nome) values (
	"bolo"
);
insert into TB_Categorias (nome) values (
	"salgado"
);
insert into TB_Categorias (nome) values (
	"morango"
);
insert into TB_Categorias (nome) values (
	"chocolate"
);
insert into TB_Categorias (nome) values (
	"uva"
);
insert into TB_Categorias (nome) values (
	"creme"
);

insert into TB_Usuarios (matricula, nome, cpf, senha) values (
	"10000000", "Fabio Souza", 	"88888888888", "senha"
);
insert into TB_Usuarios (matricula, nome, cpf, senha) values (
	"10000001", "Cleber Souza",   "99999999999", "senha1"
);
insert into TB_Usuarios (matricula, nome, cpf, senha) values (
	"10000002", "Deborah Ribeiro", "77777777777", "senha2"
);
insert into TB_Usuarios (matricula, nome, cpf, senha) values (
	"10000003", "Fabiana Oliveria", "66666666666", "senha3"
);
insert into TB_Usuarios (matricula, nome, cpf, senha) values (
	"10000004", "Afonso Panilk", "55555555555", "senha4"
);
insert into TB_Usuarios (matricula, nome, cpf, senha) values (
	"10000005", "Deborah Ribeiro", "44444444444", "senha5"
);
insert into TB_Blocos (nome) values ( "azul" );
insert into TB_Blocos (nome) values ( "verde" );
insert into TB_Blocos (nome) values ( "vermelho" );
insert into TB_Blocos (nome) values ( "amarelo" );


insert into TB_Salas (nome) values (
	"GRACE HOPPER"
);
insert into TB_Salas (nome) values (
	"TIM BENNERS-LEE"
);
insert into TB_Salas (numero, nome) values (
	"001",
	"JACARANDA"
);
insert into TB_Salas (numero, nome) values (
	"002",
	"JACARANDA"
);
insert into TB_Salas (numero, nome) values (
	"003",
	"JACARANDA"
);


insert into TB_Locais (cod_bloco, cod_sala, andar) values (
	1, 1, 1
);
insert into TB_Locais (cod_bloco, cod_sala, andar) values (
	1, 2, 1
);
insert into TB_Locais (cod_bloco, cod_sala, andar) values (
	1, 3, 0
);
insert into TB_Locais (cod_bloco, cod_sala, andar) values (
	1, 4, 0
);
insert into TB_Locais (cod_bloco, cod_sala, andar) values (
	3, 5, 1
);


insert into TB_Chats (remetente, destinatario, data_msg, mensagem) values (
	"10000001", "10000000", '2023-10-02 16:20:01', "Olá"
);
insert into TB_Chats (remetente, destinatario, data_msg, mensagem) values (
	"10000000", "10000001", '2023-10-02 16:20:05', "Olá, Como posso ajudar?"
);
insert into TB_Chats (remetente, destinatario, data_msg, mensagem) values (
	"10000001", "10000000", '2023-10-02 16:22:32', "Você cobrou um valor extra no meu pedido, só percebi agora, como faço pra receber?"
);
insert into TB_Chats (remetente, destinatario, data_msg, mensagem) values (
	"10000000", "10000001", '2023-10-02 16:23:05', "O valor está correto, não é possivel fazer devolução."
);
insert into TB_Chats (remetente, destinatario, data_msg, mensagem) values (
	"10000001", "10000000", '2023-10-02 16:24:02', "Não"
);
insert into TB_Chats (remetente, destinatario, data_msg, mensagem) values (
	"10000001", "10000000", '2023-10-02 16:24:10', "Não está, você foram dois brownies de morango de R$2,00, você coboru R$5"
);
insert into TB_Chats (remetente, destinatario, data_msg, mensagem) values (
	"10000001", "10000000", '2023-10-03 10:20:03', "Ola?"
);
insert into TB_Chats (remetente, destinatario, data_msg, mensagem) values (
	"10000001", "10000000", '2023-10-04 12:40:23', "Estou abrindo uma denuncia!"
);


insert into TB_Lojas (nome, dono, descricao, image) values (
	"Bricks Brownies",
    "10000000",
    "Os bronies mais crocantes estão aqui",
    "brownies.jpg"
);
insert into TB_Lojas (nome, dono, descricao, image) values (
	"Salgados Lagados",
    "10000000",
    "Os salgados mais exoticos estão aqui",
    "salgados.jpeg"
);
insert into TB_Lojas (nome, dono, descricao, image) values (
	"Pote & Bolo",
    "10000003",
    "Os bolos de pote mais cremosos estão aqui",
    "bolo_pote.jpg"
);


insert into TB_LojasFisicas (dia_da_semana, lugar, abertura, loja, fechamento) values (
	"terça",
    1,
	TIME '10:40',
	"Bricks Brownies",
    TIME '10:50'
);
insert into TB_LojasFisicas (dia_da_semana, lugar, abertura, loja, fechamento) values (
	"quinta",
    3,
	TIME '10:40',
	"Bricks Brownies",
    TIME '10:50'
);
insert into TB_LojasFisicas (dia_da_semana, lugar, abertura, loja, fechamento) values (
	"quinta",
    3,
	TIME '10:40',
	"Pote & Bolo",
    TIME '10:50'
);
insert into TB_LojasFisicas (dia_da_semana, lugar, abertura, loja, fechamento) values (
	"segunda",
    2,
	TIME '10:40',
	"Bricks Brownies",
    TIME '10:50'
);


insert into TB_Produtos (loja, nome, descricao,  image, valor) values (
	"Bricks Brownies",
    "Moranguelo",
    "Brownie de Morango",
	"morango.jpg",
    2.0
);
insert into TB_Produtos (loja, nome, descricao,  image, valor) values (
	"Bricks Brownies",
    "Cholocoloco",
    "Brownie de Chocolate",
    "chocolate.jpeg",
    2.0
);
insert into TB_Produtos (loja, nome, descricao, image, valor) values (
	"Bricks Brownies",
    "Cramarelo",
    "Brownie de Caramelo Crocante",
    "caramelo.jpg",
    2.5
);
insert into TB_Produtos (loja, nome,descricao, image, valor) values (
	"Pote & Bolo",
    "Moranlicia",
    "Bolo de Pote sabor Morango",
    "morango.jpg",
    4.3
);
insert into TB_Produtos (loja, nome, descricao, image, valor) values (
	"Pote & Bolo",
    "Latecholo",
    "Bolo de Pote sabor Chocolate",
	"chocolate.jpg",
    4.30
);
insert into TB_Produtos (loja, nome, descricao, image, valor) values (
	"Pote & Bolo",
    "Cromelate",
    "Bolo de Pote sabor Caramelo Crocante",
    "caramelo.jpg",
    2.5
);

/*
insert into TBR_CategoriaProdutos(cod, categoria, loja, produto) values (
	1, "doce",
	"Bricks Brownies", "Moranguelo"
);
insert into TBR_CategoriaProdutos(cod, categoria, loja, produto) values (
	1, "doce",
	"Bricks Brownies", "Cholocoloco"
);
insert into TBR_CategoriaProdutos(cod, categoria, loja, produto) values (
	1, "doce",
	"Bricks Brownies", "Cramarelo"
);
insert into TBR_CategoriaProdutos(cod, categoria, loja, produto) values (
	5, "morango",
	"Bricks Brownies", "Moranguelo"
);
insert into TBR_CategoriaProdutos(cod, categoria, loja, produto) values (
	6, "chocolate",
	"Bricks Brownies", "Cholocoloco"
);
insert into TBR_CategoriaProdutos(cod, categoria, loja, produto) values (
	1, "doce",
	"Pote & Bolo", "Latecholo"
);
insert into TBR_CategoriaProdutos(cod, categoria, loja, produto) values (
	1, "doce",
	"Pote & Bolo", "Cromelate"
);
insert into TBR_CategoriaProdutos(cod, categoria, loja, produto) values (
	5, "morango",
	"Pote & Bolo", "Moranlicia"
);
insert into TBR_CategoriaProdutos(cod, categoria, loja, produto) values (
	6, "chocolate",
	"Pote & Bolo", "Latecholo"
);
*/

/*
insert into TB_Vendas (NF, data_compra, valor, loja, cliente, lugar) values (
	"000000000",
    NOW(),
    5.3,
	"Bricks Brownies",
    "10000001",
    1
);
insert into TB_ProdutoNaVenda (loja, nome, venda, qtd) values (
	"Bricks Brownies", "Latecholo",
    "000000000",
    2
);
*/
insert into TB_Vendas (NF, data_compra, valor, loja, cliente, lugar) values (
	"000000020",
    DATE_ADD(NOW(), Interval -2 MONTH),
    6,
	"Pote & Bolo",
    "10000005",
    3
);
insert into TB_ProdutoNaVenda (loja, nome, venda, qtd) values (
	"Pote & Bolo", "Moranlicia",
    "000000020",
    2
);
insert into TB_ProdutoNaVenda (loja, nome, venda, qtd) values (
	"Pote & Bolo", "Latecholo",
    "000000020",
    1
);

insert into TB_Vendas (NF, data_compra, valor, loja, cliente, lugar) values (
	"000000030",
    DATE_ADD(NOW(), Interval +2 MONTH),
    8.4,
	"Pote & Bolo",
    "10000005",
    3
);
insert into TB_ProdutoNaVenda (loja, nome, venda, qtd) values (
	"Pote & Bolo", "Moranlicia",
    "000000030",
    2
);


insert into TB_Denuncias (abertura, loja, criador, motivo) values (
	DATE '20-10-04',
    "Bricks Brownies",
	"10000001",
    "Vendedor cobrou mais caro do que devia"
);


insert into TB_Moderacaos ( moderador, abertura, loja, criador) values (
	"10000005",
	DATE '20-10-04', "Bricks Brownies", "10000001"
);


insert into TB_Avaliacaos (usuario, loja, data_av, comentario, estrelas) values (
	"10000001",
	"Bricks Brownies",
    DATE '20-10-04',
    "Não consegui o extornar o valor cobrado acima do devido, o vendedor parou de me responder",
    "2.4"
);

-- QUERY --

-- Usuário com maior numero de compras
select Nome, count(*) as "Nº de compras" from TB_Usuarios, TB_Vendas
	where TB_Vendas.cliente = matricula GROUP BY cliente
	ORDER BY count(*) desc
limit 1;

-- Usuário com o maior valor gasto em compras nos ultimos três meses
select round(sum(valor), 2) as valor, cliente
	from TB_Vendas
	WHERE month(data_compra) BETWEEN month(DATE_ADD(now(), Interval -3 MONTH)) and Month(now())
	group by cliente order by sum(valor)
desc;

-- Local mais comum pra venda para retirada de produtos (vendas);
select Lugar,
       B.nome as Bloco,
       L.andar as Andar,
       S.nome as Sala,
       S.numero,
       count(*) as "Nº de Usos"

from TB_Vendas, TB_Locais L, TB_Blocos B, TB_Salas S
	where lugar = L.cod && (L.cod_bloco = B.cod && L.cod = S.cod)
	group by lugar order by count(*) desc
limit 1;

-- Loja com maior numero de vendas
select Nome, count(*) as "Nº de vendas" from TB_Lojas, TB_Vendas
	where TB_Vendas.loja = nome GROUP BY nome
	ORDER BY count(*) desc
	limit 1;

-- Produto mais caro já vendido em cada loja
SELECT loja, nome, valor
FROM (
  SELECT loja, nome, valor, 
    ROW_NUMBER() OVER (PARTITION BY loja ORDER BY valor DESC) AS rn
  FROM TB_Produtos
  WHERE nome IN (SELECT nome FROM TB_ProdutoNaVenda)
) AS subquery
WHERE rn = 1;

  SELECT loja, nome, valor, 
    ROW_NUMBER() OVER (PARTITION BY loja ORDER BY valor DESC) AS rn
  FROM TB_Produtos
  WHERE nome IN (SELECT nome FROM TB_ProdutoNaVenda);
/*