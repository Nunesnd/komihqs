// routes/company.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE - cria uma nova empresa
router.post('/', async (req, res) => {
  const { user_id, name, description, website } = req.body;
  try {
    const existing = await db.query('SELECT * FROM companies WHERE user_id = $1', [user_id]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Usuário já possui uma empresa cadastrada.' });
    }

    const result = await db.query(
      'INSERT INTO companies (user_id, name, description, website) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, name, description, website]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar empresa' });
  }
});

// READ - lista todas as empresas
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM companies');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar empresas' });
  }
});

// READ - busca empresa por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM companies WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empresa não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar empresa' });
  }
});

// UPDATE - atualiza empresa
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, website } = req.body;
  try {
    const result = await db.query(
      'UPDATE companies SET name = $1, description = $2, website = $3 WHERE id = $4 RETURNING *',
      [name, description, website, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empresa não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar empresa' });
  }
});

// DELETE - remove empresa
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM companies WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empresa não encontrada' });
    }
    res.json({ message: 'Empresa removida com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao remover empresa' });
  }
});

module.exports = router;
