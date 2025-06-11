// router/comicPages.js
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const pool = require('../db');
const upload = require('../middleware/uploadComicPages');

router.post('/:comicId/pages', upload.array('pages', 50), async (req, res) => {
  const comicId = parseInt(req.params.comicId);
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
  }

  try {
    // Ordenar arquivos pelo campo originalname (ordem de envio)
    const sortedFiles = files.sort((a, b) => a.originalname.localeCompare(b.originalname));

    for (let i = 0; i < sortedFiles.length; i++) {
      const pageNumber = i + 1;
      const imageUrl = path.join('/uploads/comics', `${comicId}`, sortedFiles[i].filename);

      await pool.query(
        'INSERT INTO comic_pages (comic_id, page_number, image_url) VALUES ($1, $2, $3)',
        [comicId, pageNumber, imageUrl]
      );
    }

    res.status(200).json({ message: 'Páginas adicionadas com sucesso.' });
  } catch (error) {
    console.error('Erro ao salvar páginas:', error);
    res.status(500).json({ error: 'Erro ao salvar páginas.' });
  }
});

module.exports = router;
