import { useEffect } from 'react';
import Entries from './Entries';
import { useDiaryStore } from './diaryStore';

export default function Diaries() {

  const wComments = useDiaryStore((state) => state.diariesWithComments);
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
