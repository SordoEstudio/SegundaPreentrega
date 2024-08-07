import { CustomError } from "../utils/customError.js";


const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({ error: err.message, code: err.code });
  }

  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'An unexpected error occurred.' });
};

export default errorHandler;