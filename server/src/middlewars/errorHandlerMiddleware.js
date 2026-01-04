import createHttpError from 'http-errors';

export const errorHandlerMiddleware = (error, req, res, next) => {
  if (createHttpError.isHttpError(error)) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
      ...(error.details && { details: error.details }),
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Internal server error',
  });
};

