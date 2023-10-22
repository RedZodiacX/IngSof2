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

router.post('/', upload.array('images[]'), applyFiltersHandler);

export const test = () => {};

export default router;
