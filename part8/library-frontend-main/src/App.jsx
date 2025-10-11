import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendation from "./components/Recommendation";
import { useQuery, useApolloClient } from "@apollo/client";
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { ALL_AUTHORS } from "./queries";
import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import { CreateForm } from "./components/CreateForm";
import "./App.css"

const App = () => {
  const result = useQuery(ALL_AUTHORS);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const navigate = useNavigate();
  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    setToken(savedToken);
  }, [setToken]);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  if (result.error) {
    return <div>Error: {result.error.message}</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    navigate("/");
  };

  return (
    <>
      <div className="navLinks">
        <Link to="/">
          <button>authors</button>
        </Link>
        <Link to={"/books"}>
          <button>books</button>
        </Link>

        {token ? (
          <>
            <Link to={"/addBook"}>
              <button>add book</button>
            </Link>
            <Link to={"/recommend"}>
              <button>recommend</button>
            </Link>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <button>login</button>
            </Link>
            <Link to={"/create"}>
              <button>New Account</button>
            </Link>
          </>
        )}
      </div>

      <Notification />

      <Routes>
        <Route
          path="/"
          element={<Authors allAuthors={result.data.allAuthors} />}
        />
        <Route path="/books" element={<Books />} />
        <Route path="/addBook" element={<NewBook />} />
        <Route
          path="/login"
          element={<LoginForm setToken={setToken} token={token} />}
        />
        <Route path="/recommend" element={<Recommendation />} />
        <Route path="/create" element={<CreateForm />} />
      </Routes>
    </>
  );
};

export default App;
