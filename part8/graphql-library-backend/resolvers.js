import { GraphQLError } from "graphql";
import { PubSub } from "graphql-subscriptions";
import Author from "./models/authorModel.js";
import Book from "./models/booksModel.js";
import jwt from "jsonwebtoken";
import User from "./models/userModel.js";

const pubsub = new PubSub();

const resolvers = {
  Query: {
    booksCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {};

      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }

      let books = await Book.find(filter).populate("author");

      console.log("FROM ALL BOOKS", books);

      books = books.filter((book) => book.author !== null);

      if (args.author) {
        books = books.filter((book) => book.author.name === args.author);
      }

      return books;
    },
    allAuthors: async () => {
      const authors = await Author.find({});

      const counts = await Book.aggregate([
        { $group: { _id: "$author", count: { $sum: 1 } } },
      ]);
      const countMap = {};
      counts.forEach((c) => {
        countMap[c._id.toString()] = c.count;
      });

      return authors.map((author) => ({
        ...author.toObject(),
        bookCount: countMap[author._id.toString()] || 0,
      }));
    },
    me: async (root, args, context) => {
      return await context.currentUser;
    },
  },
  Author: {
    bookCount: async (root, args, { dataLoaders }) => {
      return dataLoaders.bookCountLoader.load(root._id);
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authorized", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      if (!args.title || args.title.length <= 5) {
        throw new GraphQLError(
          "book title too short, title should be more than 5 characters",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: [args.title],
            },
          }
        );
      }

      if (!args.author || args.author.length <= 4) {
        throw new GraphQLError(
          "author name too short, author should be more than 4 characters",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: [args.author],
            },
          }
        );
      }

      let author = await Author.findOne({ name: args.author });

      console.log("FROM ADD BOOK", author);
      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError(`problem saving author`, {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: [args.author],
            },
          });
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id,
      });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(`problem saving book: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: [args.title],
          },
        });
      }

      const populatedBook = await book.populate("author");

      pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });

      return await book.populate("author");
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authorized", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }

      author.born = args.setBornTo;
      await author.save();
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
        return user;
      } catch (error) {
        throw new GraphQLError(`Error saving user: ${error.message}`, {
          extensions: { code: "BAD_USER_INPUT" },
          invalidArgs: [args.username, args.favouriteGenre],
        });
      }
    },
    login: async (root, args) => {
      if (!args.username || !args.password) {
        throw new GraphQLError("username and password required", {
          extensions: { code: "BAD_USER_INPUT" },
          invalidArgs: [args.username, args.password],
        });
      }

      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "password") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      const userToken = {
        username: args.username,
        id: user._id,
      };

      return { value: jwt.sign(userToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
};

export default resolvers;
