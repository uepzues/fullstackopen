import { useEffect } from 'react';
import { diarySchema } from './types';
import { useDiaryStore } from './diaryStore';
import { ZodError } from 'zod';
import { formatZodError } from './utils/zodHelpers';
import './Form.css';

export default function Form() {
  const addDiary = useDiaryStore((state) => state.addDiary);
  const error = useDiaryStore((state) => state.error);
  const clearError = useDiaryStore((state) => state.clearError);

  useEffect(() => {
    if (!error) return;

    const timeout = setTimeout(() => {
      clearError();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error, clearError]);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    const newDiaryEntry = {
      date: formData.get('date') as string,
      visibility: formData.get('visibility') as string,
      weather: formData.get('weather') as string,
      comment: formData.get('comment') as string,
    };

    try {
      const parsedEntry = diarySchema.omit({ id: true }).parse(newDiaryEntry);
      addDiary(parsedEntry);
      form.reset();
    } catch (err) {
      if (err instanceof ZodError) {
        useDiaryStore.getState().setError(formatZodError(err));
      }
    }
  };
  return (
    <div>
      <h1>Add Entry</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        date: <input type="text" name="date" />
        <br />
        visibility: <input type="text" name="visibility" />
        <br />
        weather: <input type="text" name="weather" />
        <br />
        comment: <input type="text" name="comment" />
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  );
}
