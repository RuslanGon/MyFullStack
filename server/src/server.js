import express from 'express';
import pinoHttp from 'pino-http';
import pino from 'pino';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { errorHandlerMiddleware } from './middlewars/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewars/notFoundMiddleware.js';
import { getAllStudents } from './services/students.js';


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


app.get('/students', async(req, res) => {
  const students = await getAllStudents();
  res.json({
status: 200,
message: 'get all students',
data: students
  });
});

app.get('/students/studentId', (req, res, next) => {});


  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
