import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      message: 'Welcome to express app',
    });
});

export default app;
