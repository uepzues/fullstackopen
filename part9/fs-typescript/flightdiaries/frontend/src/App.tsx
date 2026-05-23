import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Diary } from './types';
import Entries from './Entries';

export default function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [wComments, setWComments] = useState<Diary[]>([]);
  const [isComment, setIsComment] = useState(false);

  useEffect(() => {
    axios
      .get<Diary[]>('http://localhost:3000/api/diaries')
      .then((response) => setDiaries(response.data));
  }, []);

  useEffect(() => {
    axios
      .get<Diary[]>('http://localhost:3000/api/diaries/all')
      .then((response) => setWComments(response.data));
  }, []);

  return (
    <div>
      <button onClick={() => setIsComment(!isComment)}>
        Diaries {!isComment ? '' : ' with Comments'}
      </button>
      {!isComment ? (
        <Entries diaries={diaries} />
      ) : (
        <Entries diaries={wComments} />
      )}
    </div>
  );
}
