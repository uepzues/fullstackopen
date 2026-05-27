import { useEffect } from 'react';
import Entries from './Entries';
import { useDiaryStore } from './diaryStore';

export default function Diaries() {

  // const diaries = useDiaryStore((state) => state.diaries);
  const wComments = useDiaryStore((state) => state.diariesWithComments);
  // const fetchDiaries = useDiaryStore((state) => state.fetchDiaries);
  const fetchDiariesWithComments = useDiaryStore(
    (state) => state.fetchDiariesWithComments,
  );

  useEffect(() => {
    fetchDiariesWithComments();
  }, [fetchDiariesWithComments]);

  return (
    <div>
      <h1>Diary Entries</h1>
      <Entries diaries={wComments} />
    </div>
  );
}
