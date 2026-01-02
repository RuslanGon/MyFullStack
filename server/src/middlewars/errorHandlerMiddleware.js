import createHttpError from 'http-errors';

export const errorHandlerMiddleware = (error, req, res, next) => {
  let status = 500;
  let message = 'Internal server error';

  if (createHttpError.isHttpError(error)) {
    status = error.status;
    message = error.message;
  }

  res.status(status).json({
    status,
    message,
  });
};
