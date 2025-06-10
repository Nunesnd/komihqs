const express = require('express');
const router = express.Router();
const pool = require('../db');


// Criar HQ
router.post('/comic', async (req, res) => {
  const {
    author_id,
    company_id,
    title,
    description,
    language = 'pt-BR',
    price_cents,
    published_at,
    cover_image
  } = req.body;

  if (!author_id || !title || !price_cents) {
    return res.status(400).json({ error: 'Campos obrigatórios: author_id, title, price_cents' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO comics 
        (author_id, company_id, title, description, language, price_cents, published_at, cover_image) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [author_id, company_id || null, title, description, language, price_cents, published_at || null, cover_image || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao cadastrar HQ:', err);
    res.status(500).json({ error: 'Erro interno ao cadastrar HQ' });
  }
});

// Listar todas HQs
router.get('/comic', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comics ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar HQs:', err);
    res.status(500).json({ error: 'Erro interno ao listar HQs' });
  }
});

// Obter HQ por ID
router.get('/comic/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM comics WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'HQ não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar HQ:', err);
    res.status(500).json({ error: 'Erro interno ao buscar HQ' });
  }
});

module.exports = router;
