import { create } from 'zustand';
import { type DiaryStore } from './types';
import diaryService from './diaryService';

export const useDiaryStore = create<DiaryStore>((set) => ({
  // diaries: [],
  diariesWithComments: [],
  // fetchDiaries: () => {
  //   return diaryService.getAll().then((data) => set({ diariesWithComments: data }));
  // },
  fetchDiariesWithComments: () => {
    return diaryService
      .getAllWithComments()
      .then((data) => set({ diariesWithComments: data }));
  },
  addDiary: (diary) => {
    diaryService.createEntry(diary).then((newDiary) => {
      set((state) => ({
        // diaries: [...state.diaries, newDiary],
        diariesWithComments: [...state.diariesWithComments, newDiary],
      }));
    });
  },
}));
