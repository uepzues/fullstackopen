import { gql } from "@apollo/client";

export const ME = gql`
  query {
    me {
      username
      favouriteGenre
      id
    }
  }
`;
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;
export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      genres
      id
      author {
        name
        id
        born
        bookCount
      }
    }
  }
`;
export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      id
      title
      author {
        name
        born
        bookCount
        id
      }
      published
      genres
    }
  }
`;
export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $favouriteGenre: String!) {
    createUser(username: $username, favouriteGenre: $favouriteGenre) {
      username
      favouriteGenre
      id
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription bookAdded {
    bookAdded {
      title
      published
      id
      genres
      author {
        name
        id
        born
        bookCount
      }
    }
  }
`;
