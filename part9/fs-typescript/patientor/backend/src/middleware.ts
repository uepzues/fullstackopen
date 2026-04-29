import { z } from 'zod';
import { type Response, type Request, type NextFunction } from 'express';
import { NewPatientEntrySchema } from './types.ts';

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

export default {
  newPatientParser,
  errorMiddleware,
};
