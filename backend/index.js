import express from 'express';
import env from 'dotenv';

const app = express();

env.config();

app.listen(process.env.PORT, () => {
  console.log(`Server operating on port ${process.env.PORT} `);
});
