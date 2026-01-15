import express from 'express';
import pinoHttp from 'pino-http';
import pino from 'pino';
import cors from 'cors';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import { ENV_VARS, UPLOAD_DIR } from './constants/index.js';
import { errorHandlerMiddleware } from './middlewars/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewars/notFoundMiddleware.js';
import studentsRouter from '../routes/students.js';
import authRouter from '../routes/auth.js';


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
  app.use(cookieParser());
  app.use(express.json());

  app.use('/uploads', express.static(UPLOAD_DIR));


  app.use(studentsRouter);
  app.use(authRouter);

  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
