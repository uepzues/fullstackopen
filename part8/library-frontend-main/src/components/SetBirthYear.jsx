import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries.js";
import { useMutation } from "@apollo/client";
import Select from "react-select";
import "./SetBirthYear.css"

export default function SetBirthYear({ authors }) {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const options = authors.map((a) => ({
    value: a.name,
    label: a.name,
  }));

  const submit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("name needed");
      return;
    }
    updateAuthor({
      variables: { name: name.value, setBornTo: parseInt(born) },
    });

    setName("");
    setBorn("");
  };

  useEffect(() => {
    if (result.data && result.data.updateAuthor === null) {
      console.log("Author not found");
    }
  }, [result.data]);

  return (
    <div>
      <form className="formBirthYear" onSubmit={submit}>
        <Select
          options={options}
          value={name}
          onChange={(author) => setName(author)}
        />
        <br />
        Born:{" "}
        <input
          type="text"
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <button type="submit">update author</button>
      </form>
    </div>
  );
}

SetBirthYear.propTypes = {
  authors: PropTypes.array,
};
