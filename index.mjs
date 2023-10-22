import { starConnection } from './src/mongoo/index.mjs';
import { PORT } from './src/commons/env.mjs';
import app from './app.mjs';

const starServer = async () => {
  await starConnection();
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
};

starServer();
