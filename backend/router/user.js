const express = require('express');
const router = express.Router();
const pool = require('../db');

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
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

module.exports = router;
