import { z } from 'zod';
import { Visibility, Weather, type NewDiaryEntry } from './types.ts';

const parseNewDiaryEntry = (object: unknown): NewDiaryEntry => {
 return NewEntrySchema.parse(object);
};

export const NewEntrySchema = z.object({
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.iso.date(),
  comment: z.string().optional()
});

export default parseNewDiaryEntry;
