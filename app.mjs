import Express from 'express';
import bodyParser from 'body-parser';
import Boom from '@hapi/boom';
import FilterRouter from './src/handlers/filters/index.mjs';
import buildContainer from './src/container/buildContainer.mjs';

const app = Express();
app.use(bodyParser.json());
app.use(buildContainer);

app.get('/', (req, res) => {
  res.send('ok');
});

app.use('/images', FilterRouter);

app.use((error, _req, res, next) => {
  if (error) {
    const err = Boom.isBoom(error) ? error : Boom.internal(error);
    const { statusCode } = err.output;
    const { payload } = err.output;
    payload.stack = error.stack;
    return res.status(statusCode).json(payload);
  }
  return next();
});

const starServer = async () => {
  await starConnection();
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
};

starServer();
