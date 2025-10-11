import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../queries.js";
import { useNavigate } from "react-router-dom";

export const CreateForm = () => {
  const [creds, setCreds] = useState({
    username: "",
    favouriteGenre: "",
  });

  const navigate = useNavigate();

  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({
        variables: {
          username: creds.username,
          favouriteGenre: creds.favouriteGenre,
        },
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        username:{" "}
        <input
          type="text"
          value={creds.username}
          onChange={(e) => setCreds({ ...creds, username: e.target.value })}
        />
        favourite genre:{" "}
        <input
          type="text"
          value={creds.favouriteGenre}
          onChange={(e) =>
            setCreds({ ...creds, favouriteGenre: e.target.value })
          }
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};
