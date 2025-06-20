const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');

// Rota para criar usuário
router.post('/', async (req, res) => {
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

// Rota para listar usuários
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE flag_oculto = false');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Atualizar usuário
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  // Agora desestruturamos 'is_company' diretamente, pois sabemos o nome da coluna no DB
  const { name, email, password, is_company } = req.body;

  let updateQuery = 'UPDATE users SET name = $1, email = $2';
  const queryParams = [name, email];
  let paramCount = 3; // Começa em 3 porque $1 e $2 já foram usados para name e email

  // 1. Lidar com a senha (opcional e hashed)
  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    updateQuery += `, password_hash = $${paramCount}`;
    queryParams.push(hashedPassword);
    paramCount++;
  }

  // 2. Lidar com a flag 'is_company'
  // Agora usamos 'is_company' diretamente na query
  if (typeof is_company !== 'undefined') { // Verifica se o campo foi enviado
    updateQuery += `, is_company = $${paramCount}`;
    queryParams.push(is_company); // O valor booleano do checkbox (true/false)
    paramCount++;
  }

  updateQuery += ` WHERE id = $${paramCount} RETURNING *`;
  queryParams.push(id); // O ID é o último parâmetro

  try {
    const result = await pool.query(
      updateQuery,
      queryParams
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Importante: Não envie password_hash de volta para o frontend!
    const user = result.rows[0];
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password_hash;

    res.json({ user: userWithoutPassword });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    console.error('Detalhe do erro do DB:', err.detail);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Deletar usuário
/*
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('UPDATE users SET flag_oculto = true WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ message: 'Usuário deletado com sucesso', user: result.rows[0] });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});
*/
router.put('/:id/ocultar', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE users SET flag_oculto = true WHERE id = $1 RETURNING *',
      [id]
    );
    res.json({ message: 'Usuário ocultado com sucesso', user: result.rows[0] });
  } catch (err) {
    console.error('Erro ao ocultar usuário:', err);
    res.status(500).json({ error: 'Erro ao ocultar usuário' });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password_hash = $2', [email, password]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = result.rows[0];
    res.json(user);
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro no login' });
  }
});

// Obter usuário por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1 AND flag_oculto = false', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado ou oculto' });
    }

    // Importante: Não envie password_hash de volta para o frontend!
    const user = result.rows[0];
    // Cria um novo objeto sem a propriedade password_hash
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password_hash;

    res.json(userWithoutPassword);
  } catch (err) {
    console.error('Erro ao buscar usuário por ID:', err);
    res.status(500).json({ error: 'Erro interno ao buscar usuário' });
  }
});

module.exports = router;
