import { create } from 'zustand';
import { type DiaryStore } from './types';
import diaryService from './diaryService';
import axios from 'axios';
import { formatZodIssues } from './utils/zodHelpers';

export const useDiaryStore = create<DiaryStore>((set) => ({
  diariesWithComments: [],
  error: null,
  clearError: () => set({ error: null }),
  setError: (error: string) => set({ error }),
  fetchDiariesWithComments: () => {
    return diaryService
      .getAllWithComments()
      .then((data) => set({ diariesWithComments: data, error: null }))
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const backendError = error.response?.data?.error;
          if (Array.isArray(backendError)) {
            set({ error: formatZodIssues(backendError) });
          } else if (typeof backendError === 'string') {
            set({ error: backendError });
          } else {
            set({ error: error.message });
          }
        } else if (error instanceof Error) {
          set({ error: error.message });
        } else {
          set({ error: 'Unknown error' });
        }
        throw error;
      });
  },
  addDiary: (diary) => {
    return diaryService
      .createEntry(diary)
      .then((newDiary) => {
        set({ error: null });
        set((state) => ({
          diariesWithComments: [...state.diariesWithComments, newDiary],
        }));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const backendError = error.response?.data?.error;
          if (Array.isArray(backendError)) {
            set({ error: formatZodIssues(backendError) });
          } else if (typeof backendError === 'string') {
            set({ error: backendError });
          } else {
            set({ error: error.message });
          }
        } else if (error instanceof Error) {
          set({ error: error.message });
        } else {
          set({ error: 'Unknown error' });
        }
        throw error;
      });
  },
}));
