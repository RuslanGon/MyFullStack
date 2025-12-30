import express from 'express';
import pinoHttp from 'pino-http';
import pino from 'pino';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const startServer = () => {
  const app = express();

  app.use(
    pinoHttp({
      logger: pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    }),
  );

  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Hello Ruslan');
  });

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
