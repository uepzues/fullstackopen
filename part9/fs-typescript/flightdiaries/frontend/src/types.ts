import { z } from 'zod';

export const weatherSchema = z.enum([
  'sunny',
  'rainy',
  'cloudy',
  'windy',
  'stormy',
]);

export const visibilitySchema = z.enum(['great', 'good', 'ok', 'poor']);

export const diarySchema = z.object({
  id: z.number(),
  date: z.string(),
  weather: weatherSchema,
  visibility: visibilitySchema,
  comment: z.string().optional(),
});

export const diariesSchema = z.array(diarySchema);

export type Diary = z.infer<typeof diarySchema>;

export interface EntryProps {
  diaries: Diary[];
}

export interface DiaryStore {
  diariesWithComments: Diary[];
  fetchDiariesWithComments: () => Promise<void>;
  addDiary: (diary: Omit<Diary, 'id'>) => void;
  error: string | null;
  clearError: () => void;
  setError: (error: string) => void;
}
