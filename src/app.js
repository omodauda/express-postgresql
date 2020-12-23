import express from 'express';
import { db } from './database';

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      message: 'Welcome to express app',
    });
});

db();

export default app;
