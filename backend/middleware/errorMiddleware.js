export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export const notFound = (req, res, next) => {
  res.status(404).json({ error: `Not Found - ${req.originalUrl}` });
};