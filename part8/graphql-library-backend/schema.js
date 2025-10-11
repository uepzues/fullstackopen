const typeDefs = `#graphql
    type User {
      username: String!
      favouriteGenre: String!
      id: ID!
      author: Author!
    }
    type Token {
      value: String!
    }
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }
    type Book{
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }
    type Query {
        booksCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]!
        allAuthors: [Author]!
        me: User
    }
    type Mutation {
      addBook (
        title: String!
        published: Int!
        author: String!
        genres: [String!]
      ): Book
      editAuthor(
        name: String!
        setBornTo: Int!
      ): Author
      createUser (
        username: String!
        favouriteGenre: String!
      ): User
      login (
        username: String!
        password: String!
      ): Token
    }

    type Subscription {
      bookAdded: Book!
    }
`;

export default typeDefs;
