import React from "react";

export default function SearchFilter({ onChange }) {
  return (
    <div>
      search: <input onChange={onChange} />
    </div>
  );
}
