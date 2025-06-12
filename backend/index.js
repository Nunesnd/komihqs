const express = require('express');
const { Pool } = require('pg');
const pool = require('./db'); 

const authorsRouter = require('./router/author');
const companyRouter = require('./router/company');
const comicRouter = require('./router/comic');
const comicPagesRouter = require('./router/comicPages');
const cors = require('cors');


const app = express();
const port = 3000;

// Middleware para aceitar JSON
app.use(express.json());
app.use(cors()); 

// Corrigido aqui
const usersRouter = require('./router/user');
app.use('/users', usersRouter);
app.use('/authors', authorsRouter);
app.use('/companies', companyRouter);
app.use('/comic', comicPagesRouter);
app.use('/', comicRouter);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

app.use((req, res, next) => {
  console.log(`🔵 Requisição recebida: ${req.method} ${req.url}`);
  next();
});

app.listen(port, '127.0.0.1', () => {
  console.log(`🚀 Servidor rodando em http://127.0.0.1:${port}`);
});
