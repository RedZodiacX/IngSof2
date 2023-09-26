import { Router } from 'express';
import multer from 'multer';
// eslint-disable-next-line
import applyFiltersHandler from './applyFiltersHandler.mjs';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', (req, res) => {
  res.send('ok imagen get');
});

router.post('/', upload.array('files'), (req, res) => {
  const { files } = req;
  const { filters } = req.body;

  console.log('Filters:', filters);

  files.forEach((file, index) => {
    console.log(`File ${index + 1}:`);
    console.log('Fieldname:', file.fieldname);
    console.log('Originalname:', file.originalname);
    console.log('Mimetype:', file.mimetype);
  });

  res.send('Archivos recibidos y procesados correctamente.');
});

export const test = () => {};

export default router;
