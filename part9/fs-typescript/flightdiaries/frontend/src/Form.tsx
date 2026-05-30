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

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
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
      await addDiary(parsedEntry);
      form.reset();
    } catch (err) {
      if (err instanceof ZodError) {
        useDiaryStore.getState().setError(formatZodError(err));
      }
    }
  };
  return (
    <div className="form-container">
      <h1>Add New Entry</h1>
      {error && (
        <div className="error-banner">
          <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="error-message">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="diary-form">
        <div className="form-group">
          <label htmlFor="date" className="field-label">Date</label>
          <input type="date" id="date" name="date" className="text-input" />
        </div>

        <div className="form-group">
          <span className="field-label">Visibility</span>
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" name="visibility" value="great" />
              <span className="radio-button-custom">Great</span>
            </label>
            <label className="radio-label">
              <input type="radio" name="visibility" value="good" />
              <span className="radio-button-custom">Good</span>
            </label>
            <label className="radio-label">
              <input type="radio" name="visibility" value="ok" />
              <span className="radio-button-custom">Ok</span>
            </label>
            <label className="radio-label">
              <input type="radio" name="visibility" value="poor" />
              <span className="radio-button-custom">Poor</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <span className="field-label">Weather</span>
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" name="weather" value="sunny" />
              <span className="radio-button-custom">Sunny</span>
            </label>
            <label className="radio-label">
              <input type="radio" name="weather" value="rainy" />
              <span className="radio-button-custom">Rainy</span>
            </label>
            <label className="radio-label">
              <input type="radio" name="weather" value="cloudy" />
              <span className="radio-button-custom">Cloudy</span>
            </label>
            <label className="radio-label">
              <input type="radio" name="weather" value="windy" />
              <span className="radio-button-custom">Windy</span>
            </label>
            <label className="radio-label">
              <input type="radio" name="weather" value="stormy" />
              <span className="radio-button-custom">Stormy</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="comment" className="field-label">Comment</label>
          <input type="text" id="comment" name="comment" placeholder="Optional notes about the flight..." className="text-input" />
        </div>

        <button type="submit" className="submit-btn">Add Entry</button>
      </form>
    </div>
  );
}
