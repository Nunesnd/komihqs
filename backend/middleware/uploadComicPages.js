const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const comicId = req.params.comicId;
    const dir = path.join(__dirname, '..', 'uploads', 'comics', comicId);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now(); // backup para evitar duplicatas
    const originalName = file.originalname;
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);

    cb(null, `${baseName}-${timestamp}.svg`);
  }
});

const fileFilter = function (req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.svg') {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos SVG são permitidos.'));
  }
};

const upload = multer({ storage: storage, fileFilter });

module.exports = upload;
