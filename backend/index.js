import express from 'express';
import env from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './router/Auth.routes.js'

const app = express();

app.use(express.json())
env.config();

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((e) => console.log(e.message));

  app.use('/api/auth/', authRouter);

  app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server message';

    return res.status(statusCode).json({
      message,
      success:false,
      statusCode
    })
  })

app.listen(process.env.PORT, () => {
  console.log(`Server operating on port ${process.env.PORT} `);
});


