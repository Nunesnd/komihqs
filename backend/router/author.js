const express = require('express');
const router = express.Router();
const pool = require('../db');

// Criar novo autor (upgrade do usuário)
router.post('/', async (req, res) => {
  const { user_id, pen_name, bio } = req.body;

  try {
    // Verifica se o user_id já está como autor
    const existing = await pool.query(
      'SELECT * FROM authors WHERE user_id = $1',
      [user_id]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Usuário já é autor' });
    }

    const result = await pool.query(
      `INSERT INTO authors (user_id, pen_name, bio) VALUES ($1, $2, $3) RETURNING *`,
      [user_id, pen_name, bio]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar autor:', err);
    res.status(500).json({ error: 'Erro ao criar autor' });
  }
});

// Listar todos os autores
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.id as author_id, a.pen_name, a.bio, u.id as user_id, u.name, u.email
      FROM authors a
      JOIN users u ON u.id = a.user_id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar autores:', err);
    res.status(500).json({ error: 'Erro ao buscar autores' });
  }
});

// Obter autor por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM authors WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar autor:', err);
    res.status(500).json({ error: 'Erro ao buscar autor' });
  }
});

// Atualizar autor
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { pen_name, bio } = req.body;

  try {
    const result = await pool.query(
    //    const result = await db.query(
      'UPDATE authors SET pen_name = $1, bio = $2 WHERE id = $3 RETURNING *',
      [pen_name, bio, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor não encontrado CCC' });
    }

    console.error('AAAAAAAAAAAAAAAAAA linha query: ', result);

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar autor BBB:', err);
    res.status(500).json({ error: 'Erro ao atualizar autor AAA' });
  }
});

// Deletar autor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor não encontrado' });
    }
    res.json({ message: 'Autor deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar autor:', err);
    res.status(500).json({ error: 'Erro ao deletar autor' });
  }
});

module.exports = router;
