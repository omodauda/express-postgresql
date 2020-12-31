import express from 'express';
import router from './routes';
import init from './config/db';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      message: 'Welcome to express app',
    });
});

app.use('/api/v1/', router);

init();

export default app;
