import { z } from 'zod';
import { Visibility, Weather, type NewDiaryEntry } from './types.ts';

const parseNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return NewEntrySchema.parse(object);
};

export const NewEntrySchema = z.object({
  weather: z.enum(Weather, {
    error: 'Incorrect weather: ' + Object.values(Weather).join(', ')
  }),
  visibility: z.enum(Visibility, {
    error: 'Incorrect visibility: ' + Object.values(Visibility).join(', ')
  }),
  date: z.iso.date(),
  comment: z.string().optional()
});

export default parseNewDiaryEntry;
