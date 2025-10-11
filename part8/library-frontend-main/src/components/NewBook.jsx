import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from "../queries";
import "./NewBook.css";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(ADD_BOOK, {
    update: (cache, { data: { addBook } }) => {
      cache.updateQuery({ query: ALL_BOOKS }, (data) => {
        return { allBooks: data.allBooks.concat(addBook) };
      });
      cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: null } },
        (data) => {
          return { allBooks: data.allBooks.concat(addBook) };
        }
      );
      cache.updateQuery({ query: ALL_AUTHORS }, (data) => {
        if (!data) return null;
        if (data.allAuthors.find((a) => a.name === addBook.author.name)) {
          return data;
        }
        return { allAuthors: data.allAuthors.concat(addBook.author) };
      });
    },
    onError: (err) => {
      // const messages = err.graphQLErrors.map((e) => e.message).join("\n");
      const messages = err.message;
      console.log(messages, "There is an error");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !author || !published || genres.length === 0) {
      alert("All fields are required");
      return;
    }

    await createBook({
      variables: { title, author, published: parseInt(published), genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form className="formNewBook" onSubmit={handleSubmit}>
        <div>
          title &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published &nbsp;
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div className="genreInput">
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button className="buttonCreateBook" type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
