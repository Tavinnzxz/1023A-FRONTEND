import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';
import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';

const app = fastify();

app.register(cors);

// Rota para verificar se o servidor está funcionando 
app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send("Fastify Funcionando!");
});

// Rota para salvar dados do formulário de pessoa
app.post('/produtos', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id, nome, preco, categoria} = request.body as any;

  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'atividade',
      port: 3306,
    });

    // Inserir na tabela pessoa
    await conn.query(
      "INSERT INTO produtos (id, nome, preco, categoria) VALUES (?, ?, ?, ?)",
      [id, nome, preco, categoria]
    );

    await conn.end();
    reply.status(200).send({ mensagem: "Cliente cadastrado com sucesso!" });
  } catch (erro: any) {
    console.log(`❌ Deu erro! :` + erro);
    if (erro.code === "ECONNREFUSED") {
      console.log("❌ ERRO: LIGUE O LARAGON => Conexão recusada");
      reply.status(400).send({ mensagem: "❌ ERRO: LIGUE O LARAGON => Conexão recusada" });
    } else if (erro.code === 'ER_BAD_DB_ERROR') {
      console.log("❌ ERRO: CRIE UM BANCO DE DADOS COM O NOME DEFINIDO NA CONEXÃO => Conexão não encontrada");
      reply.status(400).send({ mensagem: "❌ ERRO: CRIE UM BANCO DE DADOS COM O NOME DEFINIDO NA CONEXÃO => Conexão não encontrada" });
    } else if (erro.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log("❌ ERRO: CONFERIR O USUÁRIO E SENHA DEFINIDOS NA CONEXÃO => Conexão não encontrada");
      reply.status(400).send({ mensagem: "❌ ERRO: CONFERIR O USUÁRIO E SENHA DEFINIDOS NA CONEXÃO => Conexão não encontrada" });
    } else if (erro.code === 'ER_NO_SUCH_TABLE') {
      console.log("❌ ERRO: Você deve criar a tabela com o mesmo nome da sua QUERY");
      reply.status(400).send({ mensagem: "❌ ERRO: Você deve criar a tabela com o mesmo nome da sua QUERY" });
    } else if (erro.code === 'ER_PARSE_ERROR') {
      console.log("❌ ERRO: Você tem um erro de escrita em sua QUERY confira: VÍRGULAS, PARENTESES E NOME DE COLUNAS");
      reply.status(400).send({ mensagem: "❌ ERRO: Você tem um erro de escrita em sua QUERY confira: VÍRGULAS, PARENTESES E NOME DE COLUNAS" });
    } else if (erro.code === 'ER_DUP_ENTRY') {
      console.log("Usuário já existente");
      reply.status(400).send({ mensagem: "Usuário já existente" });
    } 
    else if (erro.code === 'ER_BAD_FIELD_ERROR') {
      console.log("❌ ERRO: Você tem um erro na busca por um campo que não existe");
      reply.status(400).send({ mensagem: "❌ ERRO: Você tem um erro na busca por um campo que não existe" });
    } else {
      console.log(erro);
      reply.status(400).send({ mensagem: "❌ ERRO: Não identificado" });
    }
  }
});

// Rota para buscar produtos cadastrados
app.get('/produtos', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'atividade',
      port: 3306,
    });

    // Consultar todos os produtos na tabela "produto"
    const [rows] = await conn.query("SELECT * FROM produtos");
    await conn.end();

    reply.status(200).send(rows);
  } catch (erro: any) {
    console.log(`❌ Deu erro! :` + erro);
    if (erro.code === "ECONNREFUSED") {
      reply.status(400).send({ mensagem: "❌ ERRO: LIGUE O LARAGON => Conexão recusada" });
    } else if (erro.code === 'ER_BAD_DB_ERROR') {
      reply.status(400).send({ mensagem: "❌ ERRO: CRIE UM BANCO DE DADOS COM O NOME DEFINIDO NA CONEXÃO => Conexão não encontrada" });
    } else if (erro.code === 'ER_NO_SUCH_TABLE') {
      reply.status(400).send({ mensagem: "❌ ERRO: Você deve criar a tabela com o mesmo nome da sua QUERY" });
    } else {
      reply.status(400).send({ mensagem: "❌ ERRO: Não identificado" });
    }
  }
});

// Rota para buscar usuários cadastrados
app.get('/usuarios', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'atividade',
      port: 3306,
    });

    // Consultar todos os usuários na tabela "usuarios"
    const [rows] = await conn.query("SELECT id, nome, sobrenome, cidade FROM usuarios");
    await conn.end();

    reply.status(200).send(rows);
  } catch (erro: any) {
    console.log(`❌ Deu erro! :` + erro);
    if (erro.code === "ECONNREFUSED") {
      reply.status(400).send({ mensagem: "❌ ERRO: LIGUE O LARAGON => Conexão recusada" });
    } else if (erro.code === 'ER_BAD_DB_ERROR') {
      reply.status(400).send({ mensagem: "❌ ERRO: CRIE UM BANCO DE DADOS COM O NOME DEFINIDO NA CONEXÃO => Conexão não encontrada" });
    } else if (erro.code === 'ER_NO_SUCH_TABLE') {
      reply.status(400).send({ mensagem: "❌ ERRO: Você deve criar a tabela com o mesmo nome da sua QUERY" });
    } else {
      reply.status(400).send({ mensagem: "❌ ERRO: Não identificado" });
    }
  }
});

// Iniciar o servidor
app.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

interface Produto {
  itemId: string;
  itemNome: string;
  itemDescricao: string;
  itemPreco: string;
}