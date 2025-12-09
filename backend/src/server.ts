import { app } from './app';
import { env } from './config/env';

const port = parseInt(env.port, 10);

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});