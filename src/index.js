import dotenv from 'dotenv';
import regeneratorRuntime from 'regenerator-runtime';
import app from './app';

dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
