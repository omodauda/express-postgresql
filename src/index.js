import regeneratorRuntime from 'regenerator-runtime';
import app from './app';
import config from './config';

const { port } = config;

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
