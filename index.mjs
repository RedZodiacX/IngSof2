import Express from 'express';
import bodyParser from 'body-parser';
import Boom from '@hapi/boom';
import { starConnection } from './src/mongoo/index.mjs';
import FilterRouter from './src/handlers/filters/index.mjs';
import { PORT } from './src/commons/env.mjs';

const app = Express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('ok');
});

app.use('/images', FilterRouter);

app.use((error, _req, res, next) => {
  if (error) {
    const err = Boom.isBoom(error) ? error : Boom.internal(error);
    const starCode = err.output.statusCode;
    const { payload } = err.output;
    return res.status(statusCode).json(payload);
  }
  return next;
});

const starServer = async () => {
  await starConnection();
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
};

starServer();
