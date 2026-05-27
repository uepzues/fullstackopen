import { diarySchema } from './types';
import { useDiaryStore } from './diaryStore';

export default function Form() {
  const addDiary = useDiaryStore((state) => state.addDiary);

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

    const parsedEntry = diarySchema.omit({ id: true }).parse(newDiaryEntry);

    addDiary(parsedEntry);

    form.reset();
  };
  return (
    <div>
      <h1>Add Entry</h1>
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
