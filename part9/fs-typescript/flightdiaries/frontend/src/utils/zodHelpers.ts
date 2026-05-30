import { ZodError, type ZodIssue } from 'zod';

export const formatZodError = (error: ZodError): string =>
  error.issues
    .map((i: ZodIssue) =>
      i.path && i.path.length ? `${i.path.join('.')}: ${i.message}` : i.message, 
    )
    .join('; ');

export const formatZodIssues = (issues: ZodIssue[]): string =>
  issues
    .map((i: ZodIssue) =>
      i.path && i.path.length ? `${i.path.join('.')}: ${i.message}` : i.message,
    )
    .join('; ');

export default {
  formatZodError,
  formatZodIssues,
};
