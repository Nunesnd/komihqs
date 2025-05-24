
// backend/index.js
const express = require('express');
const { Pool } = require('pg');
const pool = require('./db'); 

const app = express();
const port = 3000;

// Middleware para aceitar JSON no corpo da requisição
app.use(express.json());

// Teste de conexão
pool.connect()
  .then(() => console.log('🟢 Conectado ao banco de dados'))
  .catch((err) => console.error('🔴 Erro ao conectar no banco:', err));

// Rota de teste
app.get('/', (req, res) => {
    console.log('🟢 Rota GET / acessada');
  res.status(200).send('Hello, mundo!');
});

// Rota para cadastrar usuário
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error('Erro ao inserir usuário:', err);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

app.use((req, res, next) => {
  console.log(`🔵 Requisição recebida: ${req.method} ${req.url}`);
  next();
});

// Inicia o servidor
app.listen(port, '127.0.0.1', () => {
  console.log(`🚀 Servidor rodando em http://127.0.0.1:${port}`);
});

