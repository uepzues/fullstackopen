import { GraphQLError } from 'graphql'
import Author from './models/authorModel.js'
import Book from './models/booksModel.js'
import jwt from 'jsonwebtoken'
import User from './models/userModel.js'



const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}

      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }

      let books = await Book.find(filter).populate('author')

      if (args.author) {
        books = books.filter((book) => book.author.name === args.author)
      }

      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      // if(!authors){
      //   console.log("authors not found")
      // }
      return authors
    },
    me: async (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root._id })
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authorized', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      if (!args.title || args.title.length <= 5) {
        throw new GraphQLError(
          'book title too short, title should be more than 5 characters',
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: [args.title],
            },
          }
        )
      }

      if (!args.author || args.author.length <= 4) {
        throw new GraphQLError(
          'author name too short, author should be more than 4 characters',
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: [args.author],
            },
          }
        )
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError(`problem saving author`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: [args.author],
            },
          })
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id,
      })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError(`problem saving book: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: [args.title],
          },
        })
      }

      return await book.populate('author')
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authorized', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      await author.save()
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      try {
        await user.save()
        return user
      } catch (error) {
        throw new GraphQLError(`Error saving user: ${error.message}`, {
          extensions: 'BAD_USER_INPUT',
          invalidArgs: [args.username, args.favouriteGame],
        })
      }
    },
    login: async (root, args) => {
      if (!args.username || !args.password) {
        throw new GraphQLError('username and password required', {
          extensions: 'BAD_USER_INPUT',
          invalidArgs: [args.username, args.password],
        })
      }

      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password') {
        throw new GraphQLError('wrong credentials', {
          extensions: 'BAD_USER_INPUT',
        })
      }
      const userToken = {
        username: args.username,
        id: user._id,
      }

      return { value: jwt.sign(userToken, process.env.JWT_SECRET) }
    },
  },
}

export default resolvers