import { useState } from 'react';
import type { Diary, EntryProps } from './types';
import './Entries.css';

export default function Entries({ diaries }: EntryProps) {
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(null);

  const openModal = (diary: Diary) => {
    setSelectedDiary(diary);
  };

  const closeModal = () => {
    setSelectedDiary(null);
  };

  return (
    <>
      <div>
        {diaries.map((d) => (
          <ul key={d.id}>
            <li>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  openModal(d);
                }}
              >
                <p>{d.date}</p>
              </a>
              <p>{d.weather}</p>
              <p>{d.visibility}</p>
            </li>
          </ul>
        ))}
      </div>

      {selectedDiary && (
        <div className="modal-background">
          <div className="modal">
            <button onClick={closeModal}>Close</button>
            <h2>Diary entry for {selectedDiary.date}</h2>
            <p>
              <strong>Weather:</strong> {selectedDiary.weather}
            </p>
            <p>
              <strong>Visibility:</strong> {selectedDiary.visibility}
            </p>
            <p>
              <strong>Comment:</strong> {selectedDiary.comment ?? 'No comment'}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
