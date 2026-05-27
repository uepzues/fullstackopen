import axios from 'axios';
import type { Diary } from './types';
import { diariesSchema, diarySchema } from './types';

const baseURL = 'http://localhost:3000/api/diaries';

const getAll = () => {
  return axios
    .get<unknown>(baseURL)
    .then((response) => diariesSchema.parse(response.data));
};

const getAllWithComments = () => {
  return axios
    .get<unknown>(`${baseURL}/all`)
    .then((response) => diariesSchema.parse(response.data));
};

const createEntry = (entry: Omit<Diary, 'id'>) => {
  return axios
    .post<unknown>(baseURL, entry)
    .then((response) => diarySchema.parse(response.data));
};

export default {
  getAll,
  getAllWithComments,
  createEntry,
};
