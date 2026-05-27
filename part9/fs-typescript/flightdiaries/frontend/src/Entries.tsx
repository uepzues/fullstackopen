import type { EntryProps } from "./types";


export default function Entries({diaries}: EntryProps) {
  return (
    <div>{diaries.map((d) => {
        return (
          <ul key={d.id}>
            <li>
              <p>{d.date}</p>
              <p>{d.weather}</p>
              <p>{d.visibility}</p>
              {/* <p>{d.comment}</p> */}
            </li>
          </ul>
        );
      })}</div>
  )
}
